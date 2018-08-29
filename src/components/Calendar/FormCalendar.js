import React                              from 'react';
import formats                            from './formats';
import {
  minTime,
  maxTime
}                                         from './shared';
import { 
  getDateISO,
  getDateTime
}                                         from '../../utils/date.utils';
import FormToolbar                        from './FormToolbar';
import moment                             from 'moment';
import BigCalendar                        from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';

// Setup localizer
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));


export default class FormCalendar extends React.PureComponent {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.eventPropGetter = this.eventPropGetter.bind(this);
    this.addProposedEvent = this.addProposedEvent.bind(this);
  }

  /** Computes the next/previous date and executes function to dispatch a store update. */
  handleChange(evt, callback) {
    const newDateString = getDateISO(evt);
    callback('date', newDateString);
  }

  /** Computes the fill properties of an event */
  eventPropGetter(evt) {
    let { schedule_overlap } = this.props;
    let className = '';

    if (evt.hasOwnProperty('proposed')) {
      if (schedule_overlap === true) className = "CalendarEvent--overlap";
      else className = "CalendarEvent--nooverlap";
    }
    return { className: className };
  }

  /** Adds the proposed event if we have it's date and times */
  addProposedEvent() {
    let { room_schedule,
      date, start_time, end_time, event_name } = this.props;
    let schedule = room_schedule;
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

    if (proposedEvent) schedule = [...schedule, proposedEvent];
    return schedule;
  }

  render() {
    let { date, onChange } = this.props;

    // Convert YYYY-MM-DD to JS Date
    const jsDate = new Date(moment(date).local().format());

    return (
      <div style={{ width: '35%', marginLeft: '10%' }}>
        <BigCalendar
          defaultView="day"
          date={jsDate}
          min={minTime}
          max={maxTime}
          onNavigate={(evt) => this.handleChange(evt, onChange)}

          events={this.addProposedEvent()}
          titleAccessor="event_name"
          startAccessor="start_time"
          endAccessor="end_time"
          eventPropGetter={this.eventPropGetter}

          components={{ toolbar: FormToolbar }}
          formats={formats}
        />
      </div>      
    );
  }
}