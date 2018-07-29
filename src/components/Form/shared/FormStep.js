import React from 'react';

export default class FormStep extends React.PureComponent {
  render() {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          {this.props.children}
        </div>
      </div>
    );
  }
}