// Libraries
import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CommandBar } from 'office-ui-fabric-react';

// Navigation Bar buttons
import Logo             from './Logo';
import ButtonCal        from './ButtonCal';
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
          items={[Logo, ButtonCal(this.props)]}
          farItems={far_items} 
        />
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  logged_in: state.app.logged_in,
  is_admin : state.app.is_admin
});

export default withRouter(connect(mapStateToProps)(NavBar));