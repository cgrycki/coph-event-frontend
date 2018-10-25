import React            from 'react';
import {TextField}      from 'office-ui-fabric-react/lib/TextField'; 
import {PrimaryButton}  from 'office-ui-fabric-react/lib/Button';


export default class AdminTools extends React.Component {
  state = {
    workflow: '',
    dynamo  : '',
    approve : '',
    void    : ''
  }


  /** Updates component state upon text field change */
  updateField = (field, value) => {
    this.setState({ [field]: value });
  }

}