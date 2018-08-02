import React              from 'react';
import { connect }        from 'react-redux';
import { Icon }           from 'office-ui-fabric-react';
import { 
  NavLink, 
  withRouter
}                         from 'react-router-dom';
import uiowa              from '../../assets/uiowa.png';

// Actions - LOGOUT


// Inline Styles
const logo_style = {
  height: '27px',
  marginTop: '3px',
  marginBottom: '4px',
  marginLeft: '10px'
};

const link_styles = {
  display       : 'flex',
  flexDirection : 'row',
  justifyContent: 'flex-end',
  alignItems    : 'center',
  height        : '100%',
  marginRight   : '10px'
};

const link_div_style = {
  display   : 'flex',
  alignItems: 'center'
}


// Component
class NavBarComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  renderLoginLink() {
    /* Conditional renders */
    let { loggedIn } = this.props;

    // Styles
    let iconName = (loggedIn) ? 'Unlock' : 'Lock';
    let linkText = (loggedIn) ? 'Logout' : 'Login';
    let linkHref = `${process.env.REACT_APP_REDIRECT_URI}/auth` + (loggedIn) ? '/logout': '';
    
    return (
      <NavLink to={linkHref} >
        <div style={link_div_style}>
          <Icon iconName={iconName} />&nbsp;
          {linkText}
        </div>
      </NavLink>
    );
  }

  renderCreateLink() {
    let { loggedIn, match, location } = this.props;

    // Disable if we're not logged in
    let link_style = (loggedIn) ? 
      {color: '#eeeeee'} : 
      {pointerEvents: 'none', color: 'rgba(238, 238, 238, 0.5)'};

    // Create a function to indicate active
    const isFormActive = (match, location) => location.pathname.startsWith("/form");

    return (
      <NavLink
        to="/form/user"
        isActive={isFormActive}
        style={link_style}
      >
        <div style={link_div_style}>
          <Icon iconName="AddEvent"/>&nbsp;
          {'Create an Event'}
        </div>
      </NavLink>
    );
  }

  renderDashLink() {
    let { loggedIn, match, location } = this.props;

    // Disable if we're not logged in
    let link_style = (loggedIn) ? 
      {color: '#eeeeee'} : 
      {pointerEvents: 'none', color: 'rgba(238, 238, 238, 0.5)'};

    // Create a function to indicate active
    const isDashActive = (match, location) => location.pathname.startsWith("/dashboard");

    return (
      <NavLink
        to="/form/user"
        isActive={isDashActive}
        style={link_style}
      >
        <div style={link_div_style}>
          <Icon iconName="EventDate"/>&nbsp;
          <span>{'My Events'}</span>
        </div>
      </NavLink>
    );
  }

  render() {
    return (
      <div className="NavBarWrapper">
        <div className="NavBar">
          
          <span style={{float: 'left'}}>
            <img src={uiowa} style={logo_style} />
          </span>

          <div className="NavBar--Actions" style={link_styles}>
            {this.renderCreateLink()}
            {this.renderDashLink()}
            {this.renderLoginLink()}
          </div>
        </div>
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  isAdmin : state.app.isAdmin
})
export default withRouter(connect(mapStateToProps)(NavBarComponent));