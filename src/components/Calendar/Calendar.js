import React                              from 'react';
import moment                             from 'moment';
import { connect }                        from 'react-redux';
import { fetchRooms, 
  fetchCalendarSchedule }                 from '../../actions/room.actions';
import {
  minTime,
  maxTime
}                                         from './shared';
import { getDateISO }                     from '../../utils/date.utils';
import NavPage                            from '../common/NavPage';
import Panel                              from './Panel';
import Toolbar                            from './Toolbar';
import formats                            from './formats';
import BigCalendar                        from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';


// Setup localizer
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
// Calendar components
const components = {
  toolbar: Toolbar
}





class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      view        : "month",
      checkedRooms: new Set(),
      start_date  : new Date(),
      end_date    : new Date()
    };

    
    this.onDateChange = this.onDateChange.bind(this);
    this.onCheck      = this.onCheck.bind(this);
  }

  /** Fetches rooms on mount if we don't have them loaded. */
  componentDidMount() {
    if (this.props.rooms.length === 0) this.props.fetchRooms();
  }

  /** Checks for changes in rooms+start+end dates, and fetches schedules accordingly. */
  componentDidUpdate(prevProps, prevState) {
    // Variables for fetch call
    const start = getDateISO(this.state.start_date);
    const end   = getDateISO(this.state.end_date);
    const rooms = Array.from(this.state.checkedRooms);

    // Check if we have a difference in rooms
    if ((prevState.checkedRooms.size !== this.state.checkedRooms.size) &&
        (this.state.checkedRooms.size !== 0)) {
        this.props.fetchCalendarSchedule(rooms, start, end);
    // Different start date?
    } else if ((prevState.start_date !== this.state.start_date) &&
        (this.state.checkedRooms.size !== 0)){
        this.props.fetchCalendarSchedule(rooms, start, end);
    // Different end date?
    } else if ((prevState.end_date !== this.state.end_date) &&
        (this.state.checkedRooms.size !== 0)){
        this.props.fetchCalendarSchedule(rooms, start, end);
    };
  }

  /** Updates component date ranges. */
  onDateChange(date, field) {
    // Conditional update: if start take miniumum of current start and new evt
    // If end take maximum of new evt and end_date

    let currentStart = this.state.start_date;
    let currentEnd   = this.state.end_date;
    let currentDate  = date;

    // Take the max/mins
    //if (field === 'start_date') date = Math.min(currentStart.getTime(), currentDate.getTime());
    //else date = Math.min(currentEnd.getTime(), currentDate.getTime());

    // Set the state
    this.setState({ [field]: date });
  }

  /** Adds or removes a room to or from component state. */
  onCheck(roomNumber) {
    // Create a copy of our state
    let newRooms = new Set(this.state.checkedRooms);

    // Add or remove the room accordingly
    if (newRooms.has(roomNumber)) newRooms.delete(roomNumber);
    else newRooms.add(roomNumber);
    
    // Set the component state
    this.setState({ checkedRooms: newRooms });
  }

  render() {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">

          <div className="ms-Grid-row">
            <NavPage history={this.props.history} />
          </div>

          <div className="ms-Grid-row">
            <Panel
              rooms={this.props.rooms}
              checkedRooms={this.state.checkedRooms}
              start_date={this.state.start_date}
              end_date={this.state.end_date}
              onDateChange={this.onDateChange}
              onCheck={this.onCheck}
            />

            <div className="ms-Grid-col ms-lg8 ms-xl8 ms-xxl8">
              <BigCalendar
                defaultDate={new Date()}
                defaultView="month"
                style={{ height: '600px' }}
                min={minTime}
                max={maxTime}
                
                formats={formats}
                components={components}

                events={this.props.room_schedule}
                titleAccessor="event_name"
                startAccessor='start_time'
                endAccessor='end_time'
                selectable='ignoreEvents'
              />
            </div>
        
        </div>
      </div>
    </div>
    );
  }
}


const mapStateToProps = state => ({
  rooms        : state.rooms.rooms,
  room_schedule: state.rooms.room_schedule
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms()),
  fetchCalendarSchedule: (rooms, start, end) => dispatch(fetchCalendarSchedule(rooms, start, end))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
