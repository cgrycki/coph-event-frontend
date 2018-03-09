/*
 * Form Container
 * Connects to our Redux store, and renders our HTML input forms.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import formReducer from '../reducers/form.reducer';

class FormPanel extends Component {
  render() {
    let { forms } = this.props;
    return (
      <div><b>Event Name</b> {forms.eventName}</div>
    );
  }
}

let mapStateToProps = (state) => ({forms: state.formReducer.forms});

let mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    updateForm: formReducer
  }, dispatch);
}

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormPanel);
export default FormContainer