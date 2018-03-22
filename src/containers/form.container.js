/*
 * Form Container
 * Connects to our Redux store, and renders our HTML input forms.
 */

import React from 'react';
import { connect } from 'react-redux';

import FormComponent from '../components/form/form.component';
import { updateForm, submitForm } from '../actions';

let mapStateToProps = (state) => {
  return {
    fields: state.formReducer.updateFormReducer,
    saveStatus: state.formReducer.updateFormReducer
  }
};
let mapDispatchToProps = (dispatch) => {
  return {
    onFieldBlur: (event) => dispatch(updateForm(event.target.id, event.target.value)),
    onFormSubmit: (event) => dispatch(submitForm(event))
  };
}

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormComponent);
export default FormContainer