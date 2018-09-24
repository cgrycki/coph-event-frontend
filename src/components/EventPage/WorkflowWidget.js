/* Dependencies -------------------------------------------------------------*/
import React from 'react';
import workflow from './workflow';


export default class WorkflowWidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signature_id: props.signature_id,
      package_id  : props.package_id
    };

    this.loadScript = this.loadScript.bind(this);
  }

  /** Loads the Workflow Widget src via an easyXDM Socket. */
  componentDidMount() {
    this.loadScript();
  }

  /** Dynamically loads the Workflow script into our React App */
  loadScript() {
    const { package_id, signature_id } = this.state;

    // Convert backend URI to our frontend
    const post_sign_void = `${process.env.REACT_APP_REDIRECT_URI.replace('api.', '')}/dashboard`;

    // Create an object holding our credentials 
    var WorkflowWidget = window.WorkflowWidget || {};

    // Assign variables per https://workflow.uiowa.edu/help/article/36/6
    WorkflowWidget.package_id            = package_id;
    WorkflowWidget.signature_id          = signature_id;
    WorkflowWidget.form_id               = process.env.REACT_APP_FORM_ID;
    WorkflowWidget.client_id             = process.env.REACT_APP_UIOWA_ACCESS_KEY_ID;
    WorkflowWidget.scope                 = process.env.REACT_APP_UIOWA_SCOPES;
    WorkflowWidget.environment           = process.env.REACT_APP_WF_ENV;
    WorkflowWidget.post_sign_void        = post_sign_void;
    //WorkflowWidget.post_version_mismatch = '';

    // !IMPORTANT -- Assign the object to the window so loaded script can pick up credentials
    window.WorkflowWidget = WorkflowWidget;

    // Run our version of the Workflow script
    workflow(window);
  }

  render() {
    return (<div id='workflowWidgetContainer' style={{border: '1 px solid black'}}></div>);
  }
}