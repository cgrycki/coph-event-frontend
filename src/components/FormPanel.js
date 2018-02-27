/* 
 Form Panel
 Holds our inputs for form
*/

import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col, Radio, Button } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  /*
   * @method
   * @description Helper function to create a Field group
   * @param {string} id - Unique identifier for this Form.
   * @param {string} label - Label for form entry.
   * @param {string} help - Optional. Help text to be displayed below input.
   * @returns {FormGroup} - Form Grouping
   */
  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} xs={6}>
        {label}
      </Col>
      <Col xs={6}>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>
    </FormGroup>
  );
}

export default class FormPanel extends Component {
  constructor() {
    super();
    this.state = {
      'EventName':      '',
      'EventDate':      '',
      'EventTime':      '',
      'ChairsPerTable':  6,
      'EventComments':  '',
      'UserEmail':      ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  handleChange (event) {
    /*
     * @method
     * @description Function to update our form's state on input change.
     * @param (event) event - Event triggered by input value change.
     * @returns none - State is updated by name of input group.
     */
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(target, value, name);
    
    this.setState({ [name]: value });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Create an Event</h3>

        <FieldGroup
          id="FormEventName"
          name="EventName"
          type="text"
          label="Event Name"
          placeholder="Informatics Meeting"
          onChange={this.handleChange}
          value={this.state.EventName}
          required
        />
        <FieldGroup
          id="FormEventDate"
          name="EventDate"
          type="date"
          label="Event Date"
          onChange={this.handleChange}
          value={this.state.EventDate}
          required
        />
        <FieldGroup
          id="FormEventTime"
          name="EventTime"
          type="time"
          label="Event Time"
          placeholder="08:00 AM"
          onChange={this.handleChange}
          value={this.state.EventTime}
          required
        />

        <FormGroup 
          controlID="FormChairsPerTable"
          name="ChairsPerTable"
          onChange={this.handleChange}
          required
        >
          <Col componentClass={ControlLabel} xs={2}>
            Chairs per Table
          </Col>
          <Col xs={10}>
            <Radio name="ChairsPerTable" value={6} inline checked>6</Radio>{' chairs. '}
            <Radio name="ChairsPerTable" value={8} inline>8</Radio>{' chairs. '}
          </Col>
        </FormGroup>

        <FormGroup 
          controlId="FormEventComments"
          onChange={this.handleChange}
        >
          <Col componentClass={ControlLabel} xs={2}>
            Event Comments
          </Col>
          <Col xs={10}>
            <FormControl
              name="EventComments"
              componentClass="textarea"
              placeholder="Enter details about your event here."
              value={this.state.EventComments}
            />
          </Col>
        </FormGroup>

        <FieldGroup
          id="FormUserEmail"
          name="UserEmail"
          type="text"
          label="Event Planner Email"
          placeholder="jane-doe@uiowa.edu"
          onChange={this.handleChange}
          value={this.state.UserEmail}
          required
        />

        <Button 
          bsStyle="primary"
          type="submit"
          block
        >
          Submit
        </Button>
      </form>
    );
  } 
}