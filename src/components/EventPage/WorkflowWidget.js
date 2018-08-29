/* Dependencies -------------------------------------------------------------*/
import React from 'react';
import workflow from './workflow';


export default class WorkflowWidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded     : false,
      signatureId: props.signatureId,
      packageId  : props.packageId
    };

    this.loadScript = this.loadScript.bind(this);
  }

  componentDidMount() {
    this.loadScript();
  }

  /** Dynamically loads the Workflow script into our React App */
  loadScript() {
    const { packageId: pid, signatureId: sid} = this.state;

    // Create an object holding our credentials 
    var WorkflowWidget = window.WorkflowWidget || {};

    // Assign variables per https://workflow.uiowa.edu/help/article/36/6
    WorkflowWidget.package_id            = pid;
    WorkflowWidget.signature_id          = sid;
    WorkflowWidget.form_id               = process.env.REACT_APP_FORM_ID;
    WorkflowWidget.client_id             = process.env.REACT_APP_UIOWA_ACCESS_KEY_ID;
    WorkflowWidget.scope                 = process.env.REACT_APP_UIOWA_SCOPES;
    WorkflowWidget.environment           = process.env.REACT_APP_WF_ENV;
    WorkflowWidget.post_sign_void        = 'https://localhost:3000/dashboard';
    //WorkflowWidget.post_version_mismatch = '';

    // !IMPORTANT -- Assign the object to the window so loaded script can pick up credentials
    window.WorkflowWidget = WorkflowWidget;

    // Create the script 
    /*var cacheBuster = new Date().getTime();
    var script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src   = 'https://workflow.uiowa.edu/workflow-widget/workflow.js?ver='+cacheBuster;
    script.type  = 'text/javascript';

    // Inject the script into DOM
    document.getElementsByTagName('head')[0].appendChild(script);
    */
    workflow(window);
  }

  render() {
    return (<div id='workflowWidgetContainer' style={{border: '1 px solid black'}}></div>);
  }
}