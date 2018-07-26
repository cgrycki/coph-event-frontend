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

  componentDidUpdate(nextProps) {
    this.setState({ ...nextProps });
  }

  render() {
    return (
      <div className="NavBar ms-Grid-row">
        <CommandBar className="NavBar"/>
      </div>
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