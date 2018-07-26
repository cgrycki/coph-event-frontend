import React from 'react';
import { connect } from 'react-redux';
import { DefaultButton } from 'office-ui-fabric-react';
import { updateField, resetField } from '../../../actions/field.actions';


// Component
class StepTwoComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  prevPage() { this.props.history.push("/form/"); }
  nextPage() { this.props.history.push("/form/event"); }

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
  errors: state.fields.errors
})

export default connect(mapStateToProps)(StepTwoComponent);