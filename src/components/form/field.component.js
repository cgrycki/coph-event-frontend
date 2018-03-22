import React from 'react';
import { FormFeedback, FormGroup, Input, Col, Label } from 'reactstrap';

const FieldComponent = (props) => {
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
          placeholder={(props.placeholder !== '') ? props.placeholder : undefined}
          bsSize={"sm"}
          onChange={props.onBlur}
          {...props}
        />
      </Col>
    </FormGroup>
  );
}

export class ReactField extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: props.value,
      error: props.error
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange(evt) {
    const name = this.props.name;
    const value = evt.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    this.props.onChange({ name, value, error });
  }

  render() {
    return (
      <div>Test</div>
    );
  }
}




export default FieldComponent