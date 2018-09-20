/**
 * Protected Route Component
 * Will redirect if user is not logged in.
 */

// Dependencies
import React                from 'react';
import { Redirect, Route }  from 'react-router-dom';
import { connect }          from 'react-redux';
import Home                 from '../Home';
import { Overlay }          from 'office-ui-fabric-react/lib/Overlay';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';




class ProtectedRouteClass extends React.Component {
  /**
   * Ternary operator returning the protected component or passing along another 
   * render method. This the authentication (login) status of the user from store.
   * @param [props.logged_in] {boolean} Login status from our app reducer.
  */
  getAuth = () => {
    const { logged_in, path } = this.props;
    if (logged_in) return this.renderRoute();
    else return (path.startsWith('/form')) ?
      this.renderRedirect() : this.checkRest();
  }

  /**
   * Ternary method returning an overlay and spinner or a redirect, depending
   * on the /auth/validate REST call we initiate on store initiation.
  */
  checkRest = () => {
    const { login_loading, logged_in } = this.props;
    return (login_loading || !logged_in) ? this.renderLoading() : this.resolveAuth();
  }

  resolveAuth = () => {
    const { logged_in } = this.props;
    return (logged_in) ? this.renderRoute() : this.renderRedirect();
  }

  renderRoute = () => {
    const { path, Component } = this.props;
    return (<Route path={path} component={Component} />);
  }

  renderLoading = () => {
    return (
      <Overlay isDarkThemed={false}  >
        <div className="ProtectedRouteWrapper">
          <Spinner
            size={SpinnerSize.large}
            label="Authenticating..."
            className="ProtectedRouteSpinner"
          />
        </div>
      </Overlay>
    );
  }

  renderRedirect = () => {
    const { location } = this.props;
    return (
      <Redirect to={{pathname: "/", state:{from: location }}} component={Home} />
    );
  }

  render = () => this.getAuth();
}


// Container
const mapStateToProps = (state) => ({
  logged_in     : state.app.logged_in,
  is_admin      : state.app.is_admin,
  // REST
  login_loading : state.app.login_loading,
  login_error   : state.app.login_error
});
// Set pure to false so that react+redux can rerender component within private route
export default connect(mapStateToProps, null, null, { pure: false })(ProtectedRouteClass);
