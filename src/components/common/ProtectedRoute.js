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
  let { logged_in, path, Component } = props;

  return (logged_in) ?
    // If we're logged in, render the intended component
    <Route path={path} component={Component} /> :
    // If not, redirect to home with history. This will allow rerouting 
    <Redirect 
      to={{ pathname: "/", state: { from: props.location } }}
      component={Home} />;
};


// Container
const mapStateToProps = (state) => ({
  logged_in     : state.app.logged_in,
  is_admin      : state.app.is_admin
});
// Set pure to false so that react+redux can rerender component within private route
export default connect(mapStateToProps, null, null, { pure: false })(ProtectedRouteConst);
