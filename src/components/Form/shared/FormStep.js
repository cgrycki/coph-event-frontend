import React from 'react';

export default class FormStep extends React.PureComponent {
  render() {
    const form_styles = {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    };

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col" style={form_styles}>
          {this.props.children}
        </div>
      </div>
    );
  }
}