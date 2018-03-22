import React from 'react';
import { Form, Card, CardBody, Button } from 'reactstrap';

import FieldComponent from './field.component';
import { fieldTypes } from '../../constants';

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

  componentWillReceiveProps(update) {
    this.setState({fields: update.fields});
  }

  onInputChange({name, value, error}) {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = value;

    this.setState({ fields, fieldErrors });
  }

  onFormSubmit(evt) {
    const fields = this.state.fields;
    
    evt.preventDefault();
    //this.props.onSubmit({fields});
  }

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
          //onBlur={onFieldBlur}
          onChange={this.onInputChange}
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