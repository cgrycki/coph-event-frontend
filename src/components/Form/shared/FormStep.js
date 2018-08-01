import React from 'react';

export default class FormStep extends React.PureComponent {
  render() {
    const form_styles = {
      width         : "100%",
      height        : "100%",
      display       : "flex",
      flexDirection : "column",
      flexGrow      : "1",
      justifyContent: "space-between"
    };

    return (
      <div style={form_styles}>
        {this.props.children}
      </div>
    );
  }
}