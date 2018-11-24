import React                              from 'react';
import {
  MessageBar,
  MessageBarType
}                                         from 'office-ui-fabric-react/lib/MessageBar';
import formats                            from './formats';
import {
  minTime,
  maxTime,
  scrollTime
}                                         from './shared';
import { 
  getDateISO,
  getDateTime,
  getYesterday,
  isWeekend
}                                         from '../../utils/date.utils';
import FormToolbar                        from './FormToolbar';
import moment                             from 'moment';
import BigCalendar                        from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';

// Setup localizer
const localizer = BigCalendar.momentLocalizer(moment)


export default class FormCalendar extends React.Component {
  state = {
    hintMessage: undefined,
    view       : 'work_week'
  }

  /** Checks new date value and adjust calendar view if date is/isn't on a weekend */
  componentWillUpdate(nextProps) {
    const { date } = nextProps;
    const { view } = this.state;

    if (isWeekend(date) && view !== 'week') this.onView('week');
    else if (!isWeekend(date) && view === 'week') this.onView('work_week');
  }

  onView = view => {
    this.setState({ view });
  }

  /** Computes the next/previous date and executes function to dispatch a store update. */
  handleNavigation = evt => {
    const { onChange } = this.props;

    // Don't navigate before the current date
    let newDateString;
    if (evt > new Date()) newDateString = getDateISO(evt);
    else newDateString = getDateISO(new Date());
    
    return onChange('date', newDateString);
  }

  /** Computes the fill properties of an event */
  eventPropGetter = evt => {
    let { schedule_overlap } = this.props;
    let className = '';

    if (evt.hasOwnProperty('proposed')) {
      if (schedule_overlap === true) className = "CalendarEvent--overlap";
      else className = "CalendarEvent--nooverlap";
    }
    return { className: className };
  }

  /** Adds the proposed event if we have it's date and times */
  addProposedEvent = () => {
    let { 
      schedules, date, start_time, end_time, event_name
    } = this.props;
    let proposedEvent = undefined;

    if (start_time !== '' && end_time !== '') {
      proposedEvent = {
        event_name: event_name,
        start_time: getDateTime(date, start_time),
        end_time  : getDateTime(date, end_time),
        date      : date,
        proposed  : true
      };
    };

    if (proposedEvent) schedules = [...schedules, proposedEvent];
    return schedules;
  }

  /** Parses date and time ranges from a slot selection and updates the store. */
  handleSlotSelection = calSlot => {
    const { onSelect }                       = this.props;
    const { start: slotStart, end: slotEnd } = calSlot;
    
    // Parse date and times
    const newDate = getDateISO(slotStart);
    const start   = moment(slotStart).local().format('h:mm A');
    const end     = moment(slotEnd).local().format('h:mm A');

    // Only dispatch the datetime changes if the selected slot is today or later
    if (slotStart < new Date(getYesterday())) {
      this.setState({ hintMessage: 'Your event must not be in the past' });
    }
    else {
      this.setState({ hintMessage: undefined });
      onSelect(newDate, start, end);
    }
  }

  showHint = () => {
    return (
      <MessageBar messageBarType={MessageBarType.blocked}>
        {this.state.hintMessage}
      </MessageBar>
    );
  }

  render() {
    const { date } = this.props;

    // Check if we have a valid date => convert YYYY-MM-DD to JS Date
    const jsDate = (date !== '') ?
      new Date(moment(date).local().format()) : new Date();

    return (
      <div className="FormFieldRow FormCalendar" style={{ width: '100%', marginTop: 'unset' }}>
        {this.state.hintMessage !== undefined && this.showHint()}
        <BigCalendar
          // Calendar views
          views={['work_week', 'week']}
          view={this.state.view}
          onView={this.onView}

          // Interactions
          onNavigate={this.handleNavigation}
          selectable
          onSelectSlot={this.handleSlotSelection}

          // Calendar Ranges
          min={minTime}
          max={maxTime}
          scrollToTime={scrollTime}
          
          // Calendar events
          date={jsDate}
          events={this.addProposedEvent()}
          titleAccessor="event_name"
          startAccessor="start_time"
          endAccessor="end_time"
          eventPropGetter={this.eventPropGetter}

          // Customizations
          components={{ toolbar: FormToolbar }}
          formats={formats}
          localizer={localizer}
        />
      </div>      
    );
  }
}