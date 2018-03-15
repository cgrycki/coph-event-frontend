/*
 * Form Container
 * Connects to our Redux store, and renders our HTML input forms.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Card, CardBody, Button } from 'reactstrap';

import FieldComponent from '../components/form/field.component';
import { updateForm, submitForm } from '../actions';
import { fieldTypes } from '../constants';

class FormPanel extends Component {
  render() {
    // Compute the fields
    let { onFieldBlur } = this.props;
    let fieldsMapped = fieldTypes.map(field => {
      return (
        <FieldComponent
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
        <CardBody>
          <br/>
          <Form>
            {fieldsMapped}
            <br/>
            <Button
              block={true}
              /*disabled => validation state */
              onClick={this.props.onFormSubmit}
            >
              Submit Event for Review
            </Button>
          </Form>
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