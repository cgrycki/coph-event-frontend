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

  render() {
    return (
      <div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md10 ms-lg8 ms-xl6 ms-xxl6">
            <TextField
              label="Delete from Workflow"
              placeholder="Workflow Package ID: 123456"
              //iconProps={{ iconName: "Delete" }}
              //onChange={(e) => this.updateField('workflow', e.target.value)}
              //value={this.state.workflow}
            />
            <PrimaryButton
              iconName="Delete"
              //disabled={this.props.loading}
              //onClick={() => this.props.workflowCallback(this.state.workflow)}
            >Submit
            </PrimaryButton>
          </div>
        </div>

        <br/>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md10 ms-lg8 ms-xl6 ms-xxl6">
            <TextField
              label="Delete from DynamoDB"
              placeholder="DynamoDB Package ID: 123456"
              //iconProps={{ iconName: "Delete" }}
              //onChange={(e) => this.updateField('dynamo', e.target.value)}
              //value={this.state.dynamo}
            />
            <PrimaryButton
              iconName="Delete"
              //disabled={this.props.loading}
              //onClick={() => this.props.dynamoCallback(this.state.dynamo)}
            >Submit
            </PrimaryButton>
          </div>

        </div>
      </div>
    );
  }
}