import React from 'react';
import { connect } from 'react-redux';
import { DefaultButton } from 'office-ui-fabric-react';

// Actions


// Component
class StepThreeComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  prevPage() { this.props.history.push("/form/user/"); }
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
            <p className="ms-fontSize-xl">User Information</p>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <p>User Email</p>
            <p>Contact Name</p>
          </div>
        </div>

        <div className="FormButtons ms-Grid-row">
          <div className="ms-Grid-col ms-sm3 ms-smPush1">
            <DefaultButton
              primary={false}
              secondaryText="with your Iowa account."
              disabled={this.props.loggedIn}
              onClick={() => this.prevPage()}
            >Back</DefaultButton>
          </div>

          <div className="ms-Grid-col ms-sm3 ms-smPush5">
            <DefaultButton
              primary={true}
              secondaryText="Login to create event."
              disabled={this.props.loggedIn}
              onClick={() => this.nextPage()}
            >Next</DefaultButton>          
          </div>
        </div>
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  info: state.fields.info,
  errors: state.fields.errors,
  rooms: state.rooms
});

export default connect(mapStateToProps)(StepThreeComponent);