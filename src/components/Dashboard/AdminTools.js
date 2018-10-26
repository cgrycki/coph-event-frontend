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

  /** Lifecycle method: resets text fields on successful delete. */
  componentWillReceiveProps(nextProps) {
    // Get current store state passed from dashboard
    const wasLoading = this.props.loading;
    const isLoading  = nextProps.loading;
    const isError    = nextProps.error;

    if (wasLoading && !isLoading && !isError) {
      this.setState({ workflow: '', dynamo: ''});
    }
  }

  /** Updates component state upon text field change */
  updateField = (field, value) => {
    this.setState({ [field]: value });
  }

}