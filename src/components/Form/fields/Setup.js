import React from 'react';
import { Toggle, Label, TextField } from 'office-ui-fabric-react';
import { isNumeric, isLength } from 'validator';


/**
 * Renders the HTML field to input U. Iowa MFK number if setup is required
 */
export default class Setup extends React.PureComponent {
  /* Fields 
    FUND
    ORG
    DEPT
    SUB DEPT
    GRANT PROGRAM
    INST ACCT
    ORG ACCT 
    DEPT ACCT 
    FUNC COST CNTR
  */
  renderField(label, field_length) {
    // Renders a controlled length text field
    return (
      <div className={"FormSetupInput"}>
        <TextField
          label={label}
          maxLength={field_length}
          inputClassName={"FormSetup"}
        />
      </div>
    );
  }

  renderFieldRow() {
    // Renders the fields within a row

    // Styles the 'hidden' span that holds our MFK inputs
    const flex_styles = {
      "marginLeft"    : "auto",
      "display"       : "flex",
      "justifyContent": "space-between"
    };

    return (
      <div style={flex_styles}>
        {this.renderField('FUND    ', 3)}
        {this.renderField('ORG      ', 3)}
        {this.renderField('DEPT     ', 3)}
        {this.renderField('SUB DEPT ', 3)}
        {this.renderField('GRANT    ', 3)}
        {this.renderField('INST ACCT', 3)}
        {this.renderField('ORG ACCT ', 3)}
        {this.renderField('DEPT ACCT', 3)}
        {this.renderField('COST CNTR', 3)}
      </div>
    );
  }

  render() {
    // Renders the setup required row

    // Styles the row 
    const setup_styles = {
      "padding"       : "0px 8px",
      "boxSizing"     : "border-box",
      "display"       : "flex",
      "justifyContent": "flex-start",
      "flexDirection" : "row"
    }

    return (
      <div className="ms-Grid-row" style={setup_styles}>
        <Toggle
          defaultChecked={false}
          label={"Furniture and setup required?"}
          onText="Yes"
          offText="No"
          onChanged={(evt) => this.props.onChange('setup_required', evt)}
        />
        {this.props.setup_required && this.renderFieldRow()}
      </div>
    );
  }
}