import React                              from 'react';
import moment                             from 'moment';
import { connect }                        from 'react-redux';
import {fetchRooms}                       from '../../actions/room.actions'; 
import {fetchCalendarSchedule}            from '../../actions/schedule.actions';
import {
  minTime,
  maxTime
}                                         from './shared';
import {
  getDateISO,
  getAstraTime
}                     from '../../utils/date.utils';
import Panel                              from './Panel';
import Toolbar                            from './Toolbar';
import formats                            from './formats';
import BigCalendar                        from 'react-big-calendar/lib/Calendar';

import { Callout } from 'office-ui-fabric-react/lib/Callout';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendar.css';


// Setup localizer
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));



class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      view        : "month",
      checkedRooms: new Set(),
      start_date  : new Date(),
      end_date    : new Date(),
      calloutHide : true,
      selEvent: {
        event_name: '',
        room_number: '',
        start_time: '',
        end_time: ''
      }
    };
    
    this.onCheck      = this.onCheck.bind(this);
  }

  /** Sets range of dates to expand to the date - last of the month */
  componentWillMount() {
    this.onNavigate(new Date(), 'month');
  }

  /** Fetches rooms on mount if we don't have them loaded. */
  componentDidMount() {
    document.title = "Room Schedule @ CPHB";
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

  /** Updates panel date ranges. */
  onDateChange = (date, field) => {
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

  /** Hides calendar event popup */
  onDismissCallot = () => {
    this.setState({ calloutHide: true });
  }

  /** Sets selected event in component state */
  onSelectEvent = event => {
    this.setState({ calloutHide: false, selEvent: event });
  }

  /** Syncs calendar view and component state */
  onView = view => {
    this.setState({ view });
  }

  /** Sets our start/end dates to the maximum range of current view */
  onNavigate = (date, view=this.state.view) => {
    const firstDayOfRange = moment(date).startOf(view).toDate();
    const lastDayOfRange = moment(date).endOf(view).toDate();
    this.setState({
      start_date: firstDayOfRange,
      end_date: lastDayOfRange
    });
  }

  render() {
    const { rooms }        = this.props;
    const { checkedRooms } = this.state;
    const room_resources   = rooms.filter(rm => checkedRooms.has(rm.roomNumber));

    return (
      <div className="ms-Grid-row Calendar">
        <div className="ms-Grid-col ms-sm12">

          <Panel
            rooms={this.props.rooms}
            checkedRooms={this.state.checkedRooms}
            start_date={this.state.start_date}
            end_date={this.state.end_date}
            onDateChange={this.onDateChange}
            onCheck={this.onCheck}
          />

          <div className="ms-Grid-col ms-sm12 ms-lg8">
            <BigCalendar
              defaultDate={new Date()}
              defaultView="month"
              style={{ height: '600px' }}
              min={minTime}
              max={maxTime}
              
              formats={formats}
              components={{ toolbar: Toolbar }}
              
              selectable='ignoreEvents'
              onSelectEvent={this.onSelectEvent}
              onNavigate={this.onNavigate}
              onView={this.onView}

              events={this.props.schedules}
              titleAccessor="event_name"
              startAccessor='start_time'
              endAccessor='end_time'

              resourceAccessor='room_number'
              resourceIdAccessor='roomNumber'
              resourceTitleAccessor='roomName'
              resources={room_resources}
            />
          </div>

          <Callout
            hidden={this.state.calloutHide}
            onDismiss={this.onDismissCallot}
            calloutMaxWidth={400}
            target=".rbc-event.rbc-selected"
          >
            <div className='Calendar--Callout'>
              <p>
                <span className='ms-fontWeight-semibold'>Event:{' '}</span>
                {this.state.selEvent.event_name}
              </p>
              <p>
                <span className='ms-fontWeight-semibold'>Room:{' '}</span>
                {this.state.selEvent.room_number}
              </p>
              <p>
                <span className='ms-fontWeight-semibold'>Times:{' '}</span>
                
                {`${getAstraTime(this.state.selEvent.start_time)} - ${getAstraTime(this.state.selEvent.end_time)}`}
              </p>
            </div>
          </Callout>

      </div>
    </div>
    );
  }
}


const mapStateToProps = state => ({
  rooms        : state.rooms.rooms,
  schedules: state.schedules.schedules
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms()),
  fetchCalendarSchedule: (rooms, start, end) => dispatch(fetchCalendarSchedule(rooms, start, end))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
