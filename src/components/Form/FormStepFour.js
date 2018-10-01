// Dependecies  
import React            from 'react';
import { connect }      from 'react-redux';
// Actions
import {
  updateForm,
  updateDateTimes,
  fetchRooms,
  fetchCalendarSchedule
}                       from '../../actions';
import { getWeekRange } from '../../utils/date.utils';
// Form components + fields
import {
  FormStep,
  FormTitle,
  FormButtons
}                     from './shared';
import RoomList       from './fields/RoomList';
import DateTime       from './fields/DateTime';
import FormCalendar   from '../Calendar/FormCalendar';


class Step extends React.Component {
  /** Sets the web page title on mount, checks if we need to fetch rooms */
  componentDidMount() {
    document.title = "Create an Event: When + Where";
    this.checkRooms();
  }

  /** Fetches a room schedule if date or room field changed */
  componentDidUpdate(prevProps, prevState) {
    this.checkSchedule(prevProps);    
  }

  validate = () => {
    const { info, errors, schedule_loading } = this.props;
    // If we have an overlap or theres a on-site error automatically return true
    if (schedule_loading ||
        errors.hasOwnProperty('coph_email') ||
        errors.hasOwnProperty('atrium_mfk')) return true;

    let validFlag = errors['schedule_overlap'];
    const pgFields = ['date', 'start_time', 'end_time', 'room_number'];
    pgFields.forEach(field => { if (errors.hasOwnProperty(field) || info[field] === '') validFlag = true; });
    return validFlag;
  }
  prevPage = () => this.props.history.push('/form/what');
  nextPage = () => {
    const { history, info: { room_number }} = this.props;
    if (room_number === 'XC100') history.push('/form/layout');
    else history.push('/form/misc');
  }

  onChange = (field, value) => this.props.updateForm(field, value);
  
  checkRooms = () => {
    const { rooms, rooms_loading, fetchRooms } = this.props;
    if ((!rooms_loading) && (rooms.length === 0)) return fetchRooms();
  }

  checkSchedule = (prevProps) => {
    // Fetch
    const { fetchCalendarSchedule } = this.props;

    // Room and day from props
    const { room_number: oldRoom, date: oldDate } = prevProps.info;
    const { room_number: newRoom, date: newDate } = this.props.info;
    const { weekStart: newWeekStart, weekEnd: newWeekEnd } = getWeekRange(newDate);

    // Field validations before we make GET request
    const oldDateValid = oldDate !== '';
    const newDateValid = newDate !== '';
    const newRoomValid = newRoom !== '';
    const dateChanged  = newDate !== oldDate;
    const roomChanged  = newRoom !== oldRoom;


    // The date was changed
    if (dateChanged) {
      // Check if we should download new week schedule (date !== week)
      const { weekStart: oldWeekStart, weekEnd: oldWeekEnd } = getWeekRange(oldDate);

      // If the user selected a date for the first time we need to fetch a schedule => !oldDateValid
      // Otherwise, the change in the date was via calendar nav and we should fetch
      if ((!oldDateValid || (oldWeekStart !== newWeekStart)) && (newRoomValid && newDateValid)) {
          fetchCalendarSchedule(newRoom, newWeekStart, newWeekEnd);
      }
    }
    // If the room changed, we need to fetch the schedule regardless
    else if (roomChanged && newDateValid) {
      fetchCalendarSchedule(newRoom, newWeekStart, newWeekEnd);
    };
  }

  render() {
    const { info, errors, rooms, rooms_loading, rooms_error, schedules } = this.props;

    return(
      <FormStep>
        <FormTitle progress={0.5} />
        
        <div className="ms-Grid-row ms-slideRight40 FormAlignStart">
          <RoomList
            rooms={rooms}
            rooms_loading={rooms_loading}
            rooms_error={rooms_error}
            value={info['room_number']}
            error={errors['room_number']}
            mfkError={errors['atrium_mfk']}
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

          <FormCalendar
            room_number={info['room_number']}
            schedules={schedules}
            event_name={info['event_name']}
            date={info['date']}
            start_time={info['start_time']}
            end_time={info['end_time']}
            schedule_overlap={errors['schedule_overlap']}
            onChange={this.onChange}
            onSelect={this.props.updateDateTimes}
          />
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

const mapStateToProps = state => ({
  info  : state.form.fields,
  errors: state.form.errors,
  ...state.rooms,
  ...state.schedules
})

const mapDispatchToProps = dispatch => ({
  fetchRooms           : ()                   => dispatch(fetchRooms()),
  updateForm           : (field, value)       => dispatch(updateForm(field, value)),
  updateDateTimes      : (date, start, end)   => dispatch(updateDateTimes(date, start, end)),
  fetchCalendarSchedule: (room_number, s, e)  => dispatch(fetchCalendarSchedule(room_number, s, e))
})

export default connect(mapStateToProps, mapDispatchToProps)(Step);