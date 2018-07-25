import React from 'react';
import { connect } from 'react-redux';
import {
  ActionButton,
  CommandBar,
  CommandBarButton
} from 'office-ui-fabric-react';


// Actions - LOGOUT

// Component
class NavBarComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  render() {
    return (
      <CommandBar />
    );
  }
}


// Container
const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  isAdmin : state.app.isAdmin,
  path    : state.app.path
})
export default connect(mapStateToProps)(NavBarComponent);