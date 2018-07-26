// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { DefaultButton } from 'office-ui-fabric-react';

// Components
import TextField from '../../common/TextField';
import DateField from '../../common/DateField';
import TimeField from '../../common/TimeField';
import FormButtons from '../FormButtons';
import RoomsList from './RoomList';

// Actions
import fetchRooms from '../../../actions/room.actions';
import { updateField } from '../../../actions/field.actions';


// Component
class StepThreeComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
    this.onInputChange = this.onInputChange.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  componentDidMount() {
    // Load rooms from API on mount only if we haven't already
    // Some users may come back to this page and we don't need extra requests
    if (this.props.rooms.length === 0) this.props.dispatch(fetchRooms());
  }

  onInputChange(field, value) {
    this.props.dispatch(updateField(field, value));
  }

  prevPage() { 
    this.props.history.push("/form/user/");
  }

  nextPage() {
    // Get room number and create a set of rooms that are valid for the editor
    let { room_number } = this.props.info;
    let layout_rooms = new Set(['XC100']);

    // Conditionally change route based on the above condition
    if (layout_rooms.has(room_number)) this.props.history.push("/form/layout");
    else this.props.history.push("/form/review");
  }

  render() {
    return (
      <div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <p className="ms-fontSize-xl">Event Information</p>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <TextField
              label={'Event Name'}
              placeholder={"Add a title for the event"}
              value={this.props.info['event_name']}
              onChange={this.onInputChange}
              error={this.props.errors["event_name"]}
              field={"event_name"}
            />

            <RoomsList 
              rooms={this.props.rooms}
              rooms_loading={this.props.rooms_loading}
              rooms_error={this.props.rooms_error}
              value={this.props.info['room_number']}
              onChange={this.onInputChange}
            />

            <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
              <DateField
                label={'Date'}
                value={this.props.info['date']}
                placeholder={'Add an date'}
                onChange={this.onInputChange}
              />

              <div>
                <TimeField
                  label={'Start Time'}
                  value={this.props.info['start_time']}
                  onChange={this.onInputChange}
                  field={'start_time'}
                />
              </div>

              <div>
                <TimeField
                  label={'End Time'}
                  value={this.props.info['end_time']}
                  onChange={this.onInputChange}
                  field={'end_time'}
                />
              </div>
            </div>



            <TextField
              label="Comments"
              placeholder="Enter any additional notes."
              value={this.props.info["comments"]}
              onChange={this.onInputChange}
              error={this.props.errors["comments"]}
              field={"comments"}
              required={false}
              multiline={true}
              rows={4}
            />

          </div>
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          disabled={false}
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

export default connect(mapStateToProps)(StepThreeComponent);