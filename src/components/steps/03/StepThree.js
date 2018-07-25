import React from 'react';
import { connect } from 'react-redux';

// Actions


// Component
class StepThreeComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  render() {
    return (<div><h3>Step Three</h3></div>);
  }
}


// Container
const mapStateToProps = state => ({
  info: state.fields.info,
  errors: state.fields.errors,
  rooms: state.rooms
});

export default connect(mapStateToProps)(StepThreeComponent);