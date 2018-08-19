// Dependencies
import React from 'react';
import './Form.css';


// Component
export default class Form extends React.PureComponent {
  render() {
    return (
      <div className="ms-Grid-row Form">
        {this.props.children}
      </div>
    );
  }
};