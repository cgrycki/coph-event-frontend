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
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h3>Create an Event</h3>

        <FieldGroup
          id="FormEventName"
          name="EventName"
          type="text"
          label="Event Name"
          placeholder="Informatics Meeting"
          onChange={this.props.handleChange}
          value={this.props.EventName}
          required
        />
        <FieldGroup
          id="FormEventDate"
          name="EventDate"
          type="date"
          label="Event Date"
          onChange={this.props.handleChange}
          value={this.props.EventDate}
          required
        />
        <FieldGroup
          id="FormEventTime"
          name="EventTime"
          type="time"
          label="Event Time"
          placeholder="08:00 AM"
          onChange={this.props.handleChange}
          value={this.props.EventTime}
          required
        />

        <FormGroup 
          controlId="FormChairsPerTable"
          name="ChairsPerTable"
          required
        >
          <Col componentClass={ControlLabel} xs={2}>
            Chairs per Table
          </Col>
          <Col xs={10}>
            <Radio 
              name="ChairsPerTable"
              value={6}
              inline
              onChange={this.props.handleChange}
              checked={this.props.ChairsPerTable === 6}
            >6</Radio>{' chairs. '}
            <Radio 
              name="ChairsPerTable"
              value={8}
              inline
              onChange={this.props.handleChange}
              checked={this.props.ChairsPerTable === 8}
            >8</Radio>{' chairs. '}
          </Col>
        </FormGroup>

        <FormGroup 
          controlId="FormEventComments"
          onChange={this.props.handleChange}
        >
          <Col componentClass={ControlLabel} xs={2}>
            Event Comments
          </Col>
          <Col xs={10}>
            <FormControl
              name="EventComments"
              componentClass="textarea"
              placeholder="Enter details about your event here."
              value={this.props.EventComments}
            />
          </Col>
        </FormGroup>

        <FieldGroup
          id="FormUserEmail"
          name="UserEmail"
          type="text"
          label="Event Planner Email"
          placeholder="jane-doe@uiowa.edu"
          validationstate={this.props.UserEmail === '' ? 'warning': 'success'}
          onChange={this.props.handleChange}
          value={this.props.UserEmail}
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