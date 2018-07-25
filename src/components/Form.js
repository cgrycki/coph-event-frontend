// For React
import React from 'react';

// Dumb component
export default class Form extends React.Component {
  render() {
    return (
      <div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <h1><strong>FORM ROUTER</strong></h1>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6">
            <h2>TESTING</h2>
          </div>

          <div className="ms-Grid-col ms-sm6">
            <h2>TESTING</h2>
          </div>
        </div>

        <div className="ms-Grid-row">
          {this.props.children}
        </div>
      </div>
    );
  }
}