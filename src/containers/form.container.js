/*
 * Form Container
 * Connects to our Redux store, and renders our HTML input forms.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { updateForm } from '../actions';
import formReducer from '../reducers/form.reducer';

import FormComponent, { FormTest } from '../components/form.component';

class FormPanel extends Component {
  render() {
    console.log('FormContainer rerender');
    const formFields = [
      {
        name: 'eventName',
        label: 'Event Name',
        type: 'text',
        value: this.props.forms.eventName,
        placeholder: 'Informatics Symposium',
        required: 'required'
      },
      {
        name: 'eventDate',
        label: 'Event Date',
        type: 'date',
        value: this.props.forms.eventDate,
        required: 'required'
      },
      {
        name: 'eventTime',
        label: 'Event Time',
        type: 'time',
        value: this.props.forms.eventTime,
        min: '08:00:00.00',
        max: '18:00:00.00',
        required: 'required'
      }
    ];

    let fields = formFields.map(field => {
      return (
      <FormTest 
        key={'form' + field.name}
        onChange={this.props.onChange}
        {...field}
      />);
    });

    return (<div>{fields}</div>);
  }
}

let mapStateToProps = (state) => ({forms: state.formReducer});
let mapDispatchToProps = (dispatch) => {
  return {
    onChange: (event) => dispatch(updateForm(event.target.name, event.target.value))
  };
}

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormPanel);
export default FormContainer