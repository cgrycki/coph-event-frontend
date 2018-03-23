import React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import { validateDate, validateEmail } from '../../utils';
import Field from './field.component';

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      fields: props.fields || {},
      fieldErrors: {},
      saveStatus: props.saveStatus
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ fields: nextProps.fields });
  }

  onInputChange({name, value, error}) {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  }

  validate() {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!fields.eventName) return true;
    if (!fields.eventDate) return true;
    if (!fields.userEmail) return true;
    if (errMessages.length) return true;

    return false;
  }

  render() {
    let fields = this.state.fields;

    return (
      <div className="Form ms-normalize">
        <h3 className="ms-font-l">Event Details</h3>
        <form>
          <Field
            name='eventName'
            label='Name'
            placeholder='Curing Cancer'
            value={fields.eventName}
            onChange={this.onInputChange}
            validate={(val) => (val ? false : 'Name Required')}
          />

          <Field
            name='eventDate'
            label='Date'
            placeholder='When are you thinking?'
            value={fields.eventDate}
            onChange={this.onInputChange}
            validate={(val) => (validateDate(val)) ? false : 'Date Invalid'}
          />

          {/*<Field
            name='eventTime'
            label='Event Time'
            placeholder={fields.eventTime}
            value={fields.eventTime}
            onChange={this.onInputChange}
            //validate
          />*/}

          <Field
            name='eventComments'
            label='Comments'
            placeholder=''
            value={fields.eventComments}
            onChange={this.onInputChange}
          />

          <Field
            name='userEmail'
            label='Your Email'
            placeholder='herke-dehawke@uiowa.edu'
            value={fields.userEmail}
            onChange={this.onInputChange}
            validate={(val) => (validateEmail(val)) ? false : 'Invalid Email'}
          />

        </form>

        <br />

        <PrimaryButton
          disabled={this.validate()}
        >Submit Event for Approval</PrimaryButton>
      </div>
    );
  }
}