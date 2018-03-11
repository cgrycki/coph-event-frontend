/*
 * Form Container
 * Connects to our Redux store, and renders our HTML input forms.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateForm } from '../actions';
import { Form, Card, CardHeader, CardBody } from 'reactstrap';
import FormComponent from '../components/form.component';

class FormPanel extends Component {
  render() {
    return (
      <Card>
        <CardHeader tag="h3">Create an Event</CardHeader>
        <CardBody>
          <Form>
            <FormComponent
              id={"eventName"}
              label={"Name"}
              type={"text"}
              placeholder={"CoPH Student Day"}
              value={"testing"}
              onBlur={this.props.onFormBlur}
              required={"required"}
            />
          </Form>
        </CardBody>
      </Card>
    );
  }
}

let mapStateToProps = (state) => ({forms: state.formReducer});
let mapDispatchToProps = (dispatch) => {
  return {
    onFormBlur: (event) => dispatch(updateForm(event.target.name, event.target.value))
  };
}

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormPanel);
export default FormContainer