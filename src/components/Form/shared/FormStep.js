import React from 'react';

export default class FormStep extends React.Component {
  render() {
    return (
      <div className="ms-Grid-col ms-sm12 FormStep">
        {this.props.children}
      </div>
    );
  }
}