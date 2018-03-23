import React from 'react';
import { Button } from 'office-ui-fabric-react';
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

  render() {
    let fields = this.state.fields;

    return (
      <div className="Form ms-normalize">
        <h3>Details</h3>
        <form>
          <Field
            name={'eventName'}
            label={'Event Name'}
            placeholder={'Curing Cancer'}
            value={fields.eventName}
            onChange={this.onInputChange}
          />

          <Field
            name={'eventDate'}
            label={'Event Date'}
            placeholder={'When are you thinking?'}
            value={fields.eventDate}
            onChange={this.onInputChange}
          />

          <Field
            name={'eventComments'}
            label={'Comments'}
            placeholder={''}
            value={fields.eventComments}
            onChange={this.onInputChange}
          />

          <Field
            name={'userEmail'}
            label={'Your Email'}
            placeholder={'herke-dehawke@uiowa.edu'}
            value={fields.userEmail}
            onChange={this.onInputChange}
          />

        </form>
        
        <br/>

        <Button>Submit Event for Approval</Button>
      </div>
    );
  }
}