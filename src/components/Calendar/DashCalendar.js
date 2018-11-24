import React                              from 'react';
import formats                            from './formats';
import {
  minTime,
  maxTime
}                                         from './shared';
import { getDateTime }                    from '../../utils/date.utils';
import moment                             from 'moment';
import Toolbar                            from './Toolbar';
import BigCalendar                        from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';

// Setup localizer
const localizer = BigCalendar.momentLocalizer(moment)

export default class DashCalendar extends React.Component {
  /** Formats a user's events by converting string formatted times into JS date.*/
  formatEvent(evt) {
    return {
      ...evt.event,
      start_time: getDateTime(evt.event.date, evt.event.start_time),
      end_time: getDateTime(evt.event.date, evt.event.end_time)
    };
  }

  render() {
    return (
      <div className="Dashboard--Calendar">
        <BigCalendar
          components={{ toolbar: Toolbar }}
          formats={formats}
          min={minTime}
          max={maxTime}

          localizer={localizer}
          events={this.props.events.map(this.formatEvent)}
          titleAccessor="event_name"
          startAccessor="start_time"
          endAccessor="end_time"
        />
      </div>
    );
  }
}
