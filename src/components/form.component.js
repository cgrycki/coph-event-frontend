import React from 'react';
import { FormFeedback, FormGroup, FormText, Input, Col, Label } from 'reactstrap';

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
      <Label 
        for={props.id}
        sm={4}
        size={"sm"}
        className="text-right"
      >
        {props.label}
      </Label>
      <Col sm={8}>
        <Input 
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder !== '' && props.placeholder}
          bsSize={"sm"}
          onBlur={props.onBlur}
        />
      </Col>
    </FormGroup>
  );
}

export default FormComponent