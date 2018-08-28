/** 
 * Async Helper to load the Workflow widget with credentials
 */

const WorkflowService = (pid, sid) => new Promise((resolve, reject) => {
  let ready = false;
  if (!document) reject(new Error("Document is not defined!"));

  // Attributes
  var WorkflowWidget              = window.WorkflowWidget || {};
      WorkflowWidget.form_id      = 6025;
      WorkflowWidget.package_id   = pid;
      WorkflowWidget.signature_id = sid;
      WorkflowWidget.scope        = 'workflow.api.cphb-events';
      WorkflowWidget.client_id    = 'cphb-events';
      WorkflowWidget.environment  = process.env.REACT_APP_WF_ENV;

  // Script
  const tag         = document.getElementsByTagName('script')[0];
  const script      = document.createElement('script');
  const cacheBuster = new Date().getTime();

  script.type  = 'text/javascript';
  script.async = true;
  script.src   = 'https://workflow.uiowa.edu/workflow-widget/workflow.js?ver=' + cacheBuster;
  script.onreadystatechange = () => {
    if (!ready && (!this.readyState || this.readyState === 'complete')) {
      ready = true;
      resolve(script);
    }
  };
  script.onload = script.onreadystatechange;

  script.onerror = (msg) => {
    console.log(msg);
    reject(new Error('Error while loading workflow script'));
  };

  script.onabort = (msg) => {
    console.log(msg);
    reject(new Error('Script loading aborted!'));
  };

  if (tag.parentNode !== null) {
    tag.parentNode.insertBefore(script, tag);
  }

});

export default WorkflowService;