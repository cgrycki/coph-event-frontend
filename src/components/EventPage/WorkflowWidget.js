/* Dependencies -------------------------------------------------------------*/
import React from 'react';


export default class WorkflowWidget extends React.Component {
  state = { 
    signature_id: this.props.signature_id
  }

  render() {
    return (
      <div style={{border: '1 px solid black'}}></div>
    );
  }
}