import React from 'react';
import { connect } from 'react-redux';

// actions


// React Component
class StepFourComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  render() {
    return (<div><h3>Step Four: Layout</h3></div>);
  }
}


// Redux Container
const mapStateToProps = state => ({
  
});
export default connect(mapStateToProps)(StepFourComponent);