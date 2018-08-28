/* Dependencies -------------------------------------------------------------*/
import React from 'react';
import WorkflowService from './WorkflowService';


export default class WorkflowWidgetComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loaded     : false,
      signatureId: props.signatureId,
      packageId  : props.packageId
    };

    this.loadWorkflowScript = this.loadWorkflowScript.bind(this);
  }

  componentDidMount() {
    if (!window.WorkflowWidget) this.loadWorkflowScript();
    else this.setState({ loaded: true });
  }

  async loadWorkflowScript() {
    await WorkflowService(this.state.packageId, this.state.signatureId)
      .then((script) => {
        console.log(script, window.WorkflowWidget);

        var WorkflowWidget              = window.WorkflowWidget || {};
          WorkflowWidget.form_id      = 6025;
          WorkflowWidget.package_id   = this.state.packageId;
          WorkflowWidget.signature_id = this.state.signatureId;
          WorkflowWidget.scope        = 'workflow.api.cphb-events';
          WorkflowWidget.client_id    = 'cphb-events';
          WorkflowWidget.environment  = process.env.REACT_APP_WF_ENV;

        this.setState({ loaded: true });
        this.forceUpdate();
      });
  };


  render() {
    return (
      <div id="workflowWidgetContainer" style={{border: '1 px solid black'}}></div>
    );
  }
}