import React from 'react';
import { connect } from 'react-redux';

// Actions

// Component


// Container
const mapStateToProps = state => ({
  info: state.fields.info,
  errors: state.fields.errors,
  rooms: state.rooms
})