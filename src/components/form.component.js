import React from 'react';
//import { FormGroup, FormControl, ControlLabel, HelpBlock, Col, Radio, Button } from 'react-bootstrap';
import { Form, FormFeedback, FormGroup, FormText, Input, Col, Label } from 'reactstrap';

const FormComponent = (props) => {
  /*
   * @method
   * @description Helper function to create a Field group
   * @param {string} id - Unique identifier for this Form.
   * @param {string} label - Label for form entry.
   * @param {string} help - Optional. Help text to be displayed below input.
   * @returns {FormGroup} - Form Grouping
   */


  return (
    <FormGroup row>
      <Label for={props.id} sm={4}>{props.label}</Label>
      <Col sm={8}>
        <Input 
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder={props.id !== '' && props.id}
        />
      </Col>
    </FormGroup>
  );
}

/*
export const FormTest = props => {
  return (
    <FormGroup horizontal>
      <Col componentClass={ControlLabel} xs={6}>
        {props.label}
      </Col>
      <Col xs={6}>
        <FormControl 
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          {...props}
        />
      </Col>
    </FormGroup>
  );
}
*/

export default FormComponent