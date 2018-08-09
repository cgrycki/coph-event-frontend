// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import {updateForm}  from '../../actions/field.actions';
import { 
  fetchRooms,
  fetchRoomSchedule 
}                     from '../../actions/room.actions';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';

// Form fields
import EventName      from './fields/EventName';
import DateTime       from './fields/DateTime';
import EventComments  from './fields/EventComments';
import RoomList       from './fields/RoomList';
import RoomSchedule   from '../Schedule/Schedule';


// Component
class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // Only load the rooms from our API if we haven't yet before
    if (this.props.rooms.length === 0) this.props.dispatch(fetchRooms());
  }

  componentDidUpdate(prevProps) {
    // Controls our room schedule loading: check param changes
    const old_room = prevProps.info.room_number,
        old_date = prevProps.info.date,
        new_room = this.props.info.room_number,
        new_date = this.props.info.date;

    if (((old_room !== new_room) || (old_date !== new_date)) &&
        (!this.props.schedule_loading)) this.fetchSchedule();
  }

  prevPage() {
    this.props.history.goBack(-1);
  }

  nextPage() {
    if (this.props.info['room_number'] === 'XC100') this.props.history.push("/form/layout");
    else this.props.history.push("/form/review");
  }

  onChange(field, value) {
    this.props.dispatch(updateForm(field, value));
  }

  fetchSchedule() {
    // Checks for, and downloads a room schedule
    let { info, dispatch } = this.props;
    let { room_number, date } = info;

    // Only make the API call if we have both a time and space selected.
    if ((room_number !== '') && (date !== '')) dispatch(fetchRoomSchedule(room_number, date));
  }

  render() {
    let { 
      info, errors,
      rooms, rooms_loading, rooms_error,
      room_schedule
    } = this.props;

    return (
      <FormStep>
        <FormTitle page={"Event Information"} />

        <div style={{
          display: 'flex',
          flexGrow: '1'
        }}>
          <div style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <EventName
              value={info['event_name']}
              error={errors['event_name']}
              onChange={this.onChange}
            />

            <DateTime
              date={info['date']}
              start_time={info['start_time']}
              end_time={info['end_time']}
              start_time_error={errors['start_time']}
              end_time_error={errors['end_time']}
              coph_email={info['coph_email']}
              coph_email_error={errors['coph_email']}
              onChange={this.onChange}
            />

            <RoomList
              rooms={rooms}
              rooms_loading={rooms_loading}
              rooms_error={rooms_error}
              value={info['room_number']}
              onChange={this.onChange}
            />
            
            <EventComments
              value={info['comments']}
              error={errors['comments']}
              onChange={this.onChange}
            />
          </div>

          <RoomSchedule
            room_schedule={room_schedule}
            start_time={info['start_time']}
            end_time={info['end_time']}
            event_name={info['event_name']}
          />

        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={false}
        />
      </FormStep>
    );
  }
}

// Container
const mapStateToProps = state => ({
  info  : state.fields.info,
  errors: state.fields.errors,
  ...state.rooms
});

export default connect(mapStateToProps)(StepTwo);