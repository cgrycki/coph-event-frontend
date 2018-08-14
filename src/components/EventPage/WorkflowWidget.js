/**
 * Workflow Widget for approving events
 */

import React from 'react';


export default class WorkflowWidgetComponent extends React.Component {
  constructor() {
    super();

    // Populate with environmental variables
    this.state = {
      FORM_ID  : process.env.REACT_APP_FORM_ID,
      WF_ENV   : process.env.REACT_APP_WF_ENV,
      CLIENT_ID: process.env.REACT_APP_UIOWA_ACCESS_KEY_ID,
      SCOPE    : process.env.REACT_APP_UIOWA_SCOPES
    };
  }

  populateWidget() {
    const { package_id, signature_id } = this.props;
    const { FORM_ID, WF_ENV, CLIENT_ID, SCOPE } = this.state;

    var WorkflowWidget = window.WorkflowWidget || {};
    (function() {
      // Required
      WorkflowWidget.form_id      = FORM_ID;
      WorkflowWidget.package_id   = package_id;
      WorkflowWidget.signature_id = signature_id;
      WorkflowWidget.scope        = SCOPE;
      WorkflowWidget.client_id    = CLIENT_ID;
      WorkflowWidget.environment  = WF_ENV;
      
      // Optional
      //WorkflowWidget.post_sign_void = '{url - optional}';
      //WorkflowWidget.post_version_mismatch = '{url - optional}';

      // Script variables
      var cacheBuster  = new Date().getTime();
      var script       = document.createElement('script');
          script.async = true;
          script.src   = 'https://workflow.uiowa.edu/workflow-widget/workflow.js?ver='+cacheBuster;
          script.type  = 'text/javascript';

      document.getElementsByTagName('head')[0].appendChild(script);
    })();

    console.log(window.WorkflowWidget);
  }

  populateWidget2() {
    const { package_id, signature_id } = this.props;
    const { FORM_ID, WF_ENV, CLIENT_ID, SCOPE } = this.state;
    var WorkflowWidget = window.WorkflowWidget || {};

    // Required
    WorkflowWidget.form_id      = +FORM_ID;
    WorkflowWidget.package_id   = +package_id;
    WorkflowWidget.signature_id = +signature_id;
    WorkflowWidget.scope        = SCOPE;
    WorkflowWidget.client_id    = CLIENT_ID;
    WorkflowWidget.environment  = WF_ENV;
    
    // Optional
    //WorkflowWidget.post_sign_void = '{url - optional}';
    //WorkflowWidget.post_version_mismatch = '{url - optional}';

    // Script variables
    var cacheBuster  = new Date().getTime();
    var script       = document.createElement('script');
        script.async = true;
        script.src   = 'https://workflow.uiowa.edu/workflow-widget/workflow.js?ver='+cacheBuster;
        script.type  = 'text/javascript';

    document.getElementsByTagName('head')[0].appendChild(script);

    console.log(WorkflowWidget);
  }

  render() {
    this.populateWidget2();

    return (
      <React.Fragment>
        <div id="workflowWidgetContainer"></div>
      </React.Fragment>
    );
  }
}