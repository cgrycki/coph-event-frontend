import React from 'react';
import { connect } from 'react-redux';

// actions


// React Component
class StepFiveComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  render() {
    return (<div><h3>Step Five: Review</h3></div>);
  }
}


// Redux Container
const mapStateToProps = state => ({
  
});
export default connect(mapStateToProps)(StepFiveComponent);