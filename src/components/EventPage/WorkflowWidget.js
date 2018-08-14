/**
 * Workflow Widget for approving events
 */

import React from 'react';


export default class WorkflowWidgetComponent extends React.Component {
  constructor() {
    super();
  }

  populateWidget() {
    let { package_id, signature_id } = this.props;

    var WorkflowWidget = window.WorkflowWidget || {};
    (function() {
      WorkflowWidget.form_id = process.env.FORM_ID;
      WorkflowWidget.package_id = package_id;
      WorkflowWidget.signature_id = signature_id;
      WorkflowWidget.scope = process.env.UIOWA_SCOPES;
      WorkflowWidget.client_id = process.env.UIOWA_ACCESS_KEY_ID;
      WorkflowWidget.environment = process.env.EENV;
      
      WorkflowWidget.post_sign_void = '{url - optional}';
      WorkflowWidget.post_version_mismatch = '{url - optional}';

      var cacheBuster = new Date().getTime();
      var script = document.createElement('script');
      script.async = true;
      script.src   = 'https://workflow.uiowa.edu/workflow-widget/workflow.js?ver='+cacheBuster;
      script.type  = 'text/javascript';

      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  }

  render() {
    
    return (
      <React.Fragment>
        {this.populateWidget()}
        <div id="workflowWidgetContainer"></div>
      </React.Fragment>
    );
  }
}