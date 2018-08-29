/* Dependencies -------------------------------------------------------------*/
import React from 'react';


export default class WorkflowWidgetComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loaded     : false,
      signatureId: props.signatureId,
      packageId  : props.packageId
    };
  }

  render() {
    return (
      <div id="workflowWidgetContainer" style={{border: '1 px solid black'}}></div>
    );
  }
}