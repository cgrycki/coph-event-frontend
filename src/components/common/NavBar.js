import React from 'react';
import { connect } from 'react-redux';
import {
  ActionButton,
  CommandBar,
  CommandBarButton
} from 'office-ui-fabric-react';
import { NavLink, Link } from 'react-router-dom';


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
    const far_items = [
      {
        key: 'createEvent',
        name: 'Create Event',
        icon: 'Create Event',
        onClick: () => { return <Link to="/form"/>; }
      },
      {
        key: 'myEvents',
        name: 'My Events',
        icon: 'My Events'
      },
      {
        key: 'logout',
        name: 'Logout',
        icon: 'Logout'
      }
    ]




    return (
      <div className="NavBarWrapper ms-Grid-row">
        <CommandBar className="NavBar"
          farItems={far_items}
        />
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