import React                              from 'react';
import moment                             from 'moment';
import { connect }                        from 'react-redux';
import { fetchRooms, 
  fetchCalendarSchedule }                 from '../../actions/room.actions';
import { getDateISO }                     from '../../utils/date.utils';
import Panel                              from './Panel';
import Toolbar                            from './Toolbar';
import formats                            from './formats';
import BigCalendar                        from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';


// Setup localizer
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));


const components = {
  toolbar: Toolbar
}

const test = [
  {
    start: new Date(),
    end: new Date(moment().add(1, "days")),
    title: "Some title"
  }
];





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

  /** Updates component date ranges. */
  onDateChange(date, field) {
    // Conditional update: if start take miniumum of current start and new evt
    // If end take maximum of new evt and 
    this.setState({ [field]: date })
  }

  /** Adds or removes a room to or from component state. */
  onCheck(roomNumber) {
    // Create a copy of our state
    let newRooms = new Set(this.state.checkedRooms);

    if (newRooms.has(roomNumber)) newRooms.delete(roomNumber);
    else newRooms.add(roomNumber);
    

    this.setState({ checkedRooms: newRooms });
    // Dispatch new schedule fetch
    //
  }

  render() {
    console.log(this.state.checkedRooms, Array.from(this.state.checkedRooms))
    return (
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
            style={{ height: '750px' }}

            formats={formats}
            components={components}

            events={test}
            startAccessor='start'
            endAccessor='end'
          />
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
