// For React
import React from 'react';

// Center the form page within the page container
const centered_form_style = "ms-Grid-col ms-sm12 ms-lg10 ms-xxl8 ms-lgPush1 ms-xxlPush2";

// Dumb component
export default class Form extends React.PureComponent {
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