// For React
import React from 'react';

// Dumb component
export default class Form extends React.Component {
  render() {
    return (
      <div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <h5><strong>Create an Event</strong></h5>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <h5 className="ms-textAlignCenter">~~~~~~~~~~~~~~~~~~ Progress Bar ~~~~~~~~~~~~~~~~~~~~~~~</h5>
          </div>
        </div>

        {this.props.children}
      </div>
    );
  }
}