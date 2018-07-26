// For React
import React from 'react';

// Center the form page within the page container
const centered_form_style = "ms-Grid-col ms-sm12 ms-lg8 ms-xxl6 ms-lgPush2 ms-xxlPush3";

// Dumb component
export default class Form extends React.Component {
  render() {
    return (
      <div className="Form ms-Grid-row">
        <div>

          <div className="ms-Grid-row">
            <div className={centered_form_style}>
              <h5><strong>Create an Event</strong></h5>
              <h5 className="ms-textAlignCenter">~~~~~~~~~~~~~~~~~~ Progress Bar ~~~~~~~~~~~~~~~~~~~~~~~</h5>
            </div>
          </div>

          <div className="ms-Grid-row">
            <div className={centered_form_style}>
              {this.props.children}
            </div>
          </div>

        </div>
      </div>
    );
  }
}