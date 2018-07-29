// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import {updateField}  from '../../actions/field.actions';
import fetchRooms     from '../../actions/room.actions';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';

// Form fields
import EventName      from './fields/EventName';
import DateTime       from './fields/DateTime';
import RoomList       from './fields/RoomList';
import EventComments  from './fields/EventComments';


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

  prevPage() {
    this.props.history.goBack(-1);
  }

  nextPage() {
    if (this.props.info['room_number'] === 'XC100') this.props.history.push("/form/layout");
    else this.props.history.push("/form/review");
  }

  onChange(field, value, error=undefined) {
    this.props.dispatch(updateField(field, value));
  }

  render() {
    let { 
      info, errors,
      rooms, rooms_loading, rooms_error
    } = this.props;

    return (
      <div>
        <FormTitle page={"Event Information"} />

        <FormStep>
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
            value={info['event_comments']}
            error={errors['event_comments']}
            onChange={this.onChange}
          />
        </FormStep>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={false}
        />
      </div>
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