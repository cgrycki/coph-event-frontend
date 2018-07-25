import React from 'react';
import { connect } from 'react-redux';

// Actions
// 


// Component
class AdminComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  render() {
    return (
      <div>
        <h3>Admin Page</h3>
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn
})
export default connect(mapStateToProps)(AdminComponent);