import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchRooms, fetchRoomSchedule } from '../../actions/room.actions';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import formats from './formats';

// Setup localizer
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));



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
      view: "month"
    };
  }

  render() {
    return (
      <div>
        <BigCalendar
          defaultDate={new Date()}
          defaultView="month"

          formats={formats}
          
          events={test}

          startAccessor='start'
          endAccessor='end'

          style={{ height: '500px' }}
        />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  rooms        : state.rooms.rooms,
  room_schedule: state.rooms.room_schedule
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
