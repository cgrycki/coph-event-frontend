/*
 * Form Container
 * Connects to our Redux store, and renders our HTML input forms.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Card, CardHeader, CardBody, Button } from 'reactstrap';
import FormComponent from '../components/form.component';
import { updateForm, submitForm } from '../actions';
import fieldTypes from '../constants/fieldTypes';

class FormPanel extends Component {
  render() {
    // Compute the fields
    let { fields, onFieldBlur } = this.props;
    let fieldsMapped = fieldTypes.map(field => {
      return (
        <FormComponent
          id={field.id}
          key={field.id + 'Form'} 
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          onBlur={onFieldBlur}
        />
      );
    });

    return (
      <Card>
        <CardHeader tag="h3">Create an Event</CardHeader>
        <CardBody>
          <Form>
            {fieldsMapped}
          </Form>
          <Button
            block={true}
            /*disabled => validation state */
            onClick={this.props.onFormSubmit}
          >Submit Event for Review</Button>
        </CardBody>
      </Card>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    ...state.formReducer.updateFormReducer
  }
};
let mapDispatchToProps = (dispatch) => {
  return {
    onFieldBlur: (event) => dispatch(updateForm(event.target.id, event.target.value)),
    onFormSubmit: (event) => dispatch(submitForm(event))
  };
}

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormPanel);
export default FormContainer