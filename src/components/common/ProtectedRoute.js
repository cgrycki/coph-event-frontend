/**
 * Protected Route Component
 * Will redirect if user is not logged in.
 */

// Dependencies
import React                from 'react';
import { Redirect, Route }  from 'react-router-dom';
import { connect }          from 'react-redux';
import Home                 from '../Home';


// Const
const ProtectedRouteConst = (props) => {
  let { loggedIn, path, Component } = props;

  return (loggedIn) ?
    // If we're logged in, render the intended component
    <Route path={path} component={Component} /> :
    // If not, redirect to home with history. This will allow rerouting 
    <Redirect 
      to={{ pathname: "/", state: { from: props.location } }}
      component={Home} />;
};


// Container
const mapStateToProps = (state) => ({
  loggedIn     : state.app.loggedIn,
  isAdmin      : state.app.isAdmin
});
// Set pure to false so that react+redux can rerender component within private route
export default connect(mapStateToProps, null, null, { pure: false })(ProtectedRouteConst);
