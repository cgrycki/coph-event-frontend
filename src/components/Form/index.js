// Dependencies
import React from 'react';

// Component
export default class Form extends React.PureComponent {
  render() {
    const form_style = {
      width: "100%"
    };

    return (
      <div className="ms-Grid-row" style={form_style}>
        {this.props.children}
      </div>
    );
  }
};