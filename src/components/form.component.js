import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col, Radio, Button } from 'react-bootstrap';

const FormComponent = ({ id, label, help, ...props }) => {
  /*
   * @method
   * @description Helper function to create a Field group
   * @param {string} id - Unique identifier for this Form.
   * @param {string} label - Label for form entry.
   * @param {string} help - Optional. Help text to be displayed below input.
   * @returns {FormGroup} - Form Grouping
   */
  console.log(this, this.props, props);
  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} xs={6}>
        {label}
      </Col>
      <Col xs={6}>
        <FormControl
          onChange={(event) => props.onChange(event.target.name, event.target.value)}
          {...props} 
        />
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>
    </FormGroup>
  );
}

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

export default FormComponent