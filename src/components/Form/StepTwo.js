// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import {updateForm}  from '../../actions/field.actions';
import { 
  fetchRooms,
  fetchCalendarSchedule 
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
import FormCalendar   from '../Calendar/FormCalendar';


// Component
class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    // Set web page title on mount.
    document.title = "Create Event: Event";
    
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

  validate() {
    /* Validates current step. */
    let { info, errors } = this.props;

    // If we don't have the following fields, don't let user progress.
    let needed = ['event_name', 'date', 'start_time', 'end_time', 'room_number'];
    let needed_flag = false;
    needed.forEach(field => {
      if (!info.hasOwnProperty(field) || info[field] === "") needed_flag = true;
    });
    if (needed_flag) return true;

    // Even if they have the fields, make sure they're valid
    for (var error in errors) if (errors.hasOwnProperty(error)) return true;

    // Both fields and errors passed?
    return false;
  }

  onChange(field, value) {
    this.props.dispatch(updateForm(field, value));
  }

  fetchSchedule() {
    // Checks for, and downloads a room schedule
    let { info, dispatch } = this.props;
    let { room_number, date } = info;

    // Only make the API call if we have both a time and space selected.
    if ((room_number !== '') && (date !== '')) {
      dispatch(fetchCalendarSchedule(room_number, date, date));
    };
  }

  render() {
    let { 
      info, errors,
      rooms, rooms_loading, rooms_error,
      room_schedule
    } = this.props;

    return (
      <FormStep>
        <FormTitle page={"Event Information"} progress={0.5} />

        <div className="ms-slideRightIn40 FormFields">
        <div style={{ height: "100%", display: "flex"}}>
          <div style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: "1",
            justifyContent: "space-between"
          }}>
            <EventName
              value={info['event_name']}
              error={errors['event_name']}
              onChange={this.onChange}
            />

            <RoomList
              rooms={rooms}
              rooms_loading={rooms_loading}
              rooms_error={rooms_error}
              value={info['room_number']}
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
            
            <EventComments
              value={info['comments']}
              error={errors['comments']}
              onChange={this.onChange}
            />
          </div>

          <FormCalendar
            room_number={info['room_number']}
            room_schedule={room_schedule}
            event_name={info['event_name']}
            date={info['date']}
            start_time={info['start_time']}
            end_time={info['end_time']}
            schedule_overlap={errors['schedule_overlap']}
            onChange={this.onChange}
          />
        </div>
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={this.validate()}
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