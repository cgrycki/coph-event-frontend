// Libraries
import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CommandBar } from 'office-ui-fabric-react';

// Navigation Bar buttons
import Logo             from './Logo';
import ButtonAuth       from './ButtonAuth';
import ButtonCreate     from './ButtonCreate';
import ButtonDashboard  from './ButtonDashboard';

// Styling
import './NavBar.css';

// Component
class NavBar extends React.PureComponent { 
  render() {
    let far_items = [
      ButtonCreate(this.props),
      ButtonDashboard(this.props),
      ButtonAuth(this.props)
    ];
    
    return (
      <div className="NavBarWrapper">
        <CommandBar
          className="NavBar"
          items={[Logo]}
          farItems={far_items} 
        />
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  isAdmin : state.app.isAdmin
});

export default withRouter(connect(mapStateToProps)(NavBar));