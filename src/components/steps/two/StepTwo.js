import React from 'react';
import { connect } from 'react-redux';
import { updateStep } from '../../../actions/app.actions';
import { updateField, resetField } from '../../../actions/field.actions';


// Component
class StepTwoComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  render() {
    return (
      <div>
        <h3>Step Two: User Information</h3>
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