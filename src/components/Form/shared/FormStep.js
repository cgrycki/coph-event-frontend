import React from 'react';

export default class FormStep extends React.Component {
  render() {
    return (<div className="FormStep">{this.props.children}</div>);
  }
}