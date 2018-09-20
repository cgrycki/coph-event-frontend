// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';
// Form actions
import { updateForm }             from '../../actions/form.actions';
import { fetchRooms }             from '../../actions/room.actions';
import { fetchCalendarSchedule }  from '../../actions/schedule.actions';
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
    const { info, errors } = this.props;

    let validFlag = errors['schedule_overlap'];
    const pgFields = ['date', 'start_time', 'end_time', 'room_number'];
    pgFields.forEach(field => { if (errors.hasOwnProperty(field) || info[field] === '') validFlag = true; });
    return validFlag;
  }
  prevPage = () => this.props.history.goBack(-1);
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

  checkSchedule = prevProps => {
    const { room_number: oldRoom, date: oldDate }     = prevProps.info;
    const { room_number: newRoom, date: newDate }     = this.props.info;
    const { schedule_loading, fetchCalendarSchedule } = this.props;

    // Check for changes
    if ((oldRoom !== newRoom) || (oldDate !== newDate) && !schedule_loading) {
      // Ensure neither field is black
      if ((newRoom !== '') && (newDate !== '')) fetchCalendarSchedule(newRoom, newDate);
    };
  }


  render() {
    const { info, errors, rooms, rooms_loading, rooms_error, schedules } = this.props;

    return(
      <FormStep>
        <FormTitle page={'When + Where'} progress={0.5} />
        
        <div className="ms-Grid-row ms-slideRight40 FormAlignStart">
          <RoomList
            rooms={rooms}
            rooms_loading={rooms_loading}
            rooms_error={rooms_error}
            value={info['room_number']}
            error={errors['room_number']}
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
  fetchCalendarSchedule: (room_number, date)  => dispatch(fetchCalendarSchedule(room_number, date, date))
})

export default connect(mapStateToProps, mapDispatchToProps)(Step);