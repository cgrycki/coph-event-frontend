// Dependencies
import React from 'react';

// Component
export default class Form extends React.PureComponent {
  render() {
    return (
      <div className="ms-Grid-row" style={{width: '100%'}}>
        {this.props.children}
      </div>
    );
  }
};