import React from 'react';
import { 
  Toggle, 
  Label, 
  TextField,
  FocusTrapZone,
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements as TabTypes
} from 'office-ui-fabric-react';
import MFK from './MFK';

/**
 * Renders the HTML field to input U. Iowa MFK number if setup is required
 * 
 * @example
 * 
 * ```
 * Props:
 *  * Fields 
 *  * FUND
 *  * ORG
 *  * DEPT
 *  * SUB DEPT
 *  * GRANT PROGRAM
 *  * INST ACCT
 *  * ORG ACCT 
 *  * DEPT ACCT 
 *  * FUNC COST CNTR
 *
 */
export default class Setup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      mfk: { ...props.setup_mfk },
      inputs: {}
    };

    this.onFieldChange  = this.onFieldChange.bind(this);
    this.renderField    = this.renderField.bind(this);
    this.onFieldBlur    = this.onFieldBlur.bind(this);
    this.renderFieldRow = this.renderFieldRow.bind(this);
  }

  /** Sets our component field state from *within* the focus zone. */
  onFieldChange = function(field, value, maxLength, evt) {
    //console.log(this.refs, evt, evt.target, evt.handle);

    const new_mfk = { ...this.state.mfk, [field]: value };

    // Every update check if the field can be tabbed
    if (value.length >= maxLength) {
      //console.log(value, maxLength);
      // find the html element
    };

    this.setState({ mfk: new_mfk });
  }
  
  /** Renders a controlled length text field */
  renderField(field, field_length, required) {
    // Concat label to match our store's field keys (mapped to props/state)
    const store_field = field.split(' ').join('');
    const field_value = this.state.mfk[store_field];
    
    return (
      <div className={"FormSetupInput"}>
        <TextField
          label={field}
          required={required}
          value={field_value}
          maxLength={field_length}
          inputClassName={"FormSetup"}
          onChange={evt => this.onFieldChange(store_field, evt.target.value, field_length, evt)}
        />
      </div>
    );
  }

  /** Callback on focus trap zone loses focus. Updates store with comp. state. */
  onFieldBlur() {
    this.props.onChange('setup_mfk', this.state.mfk);
  }

  /** Renders the fields within a row. */
  renderFieldRow() {
    // Styles the 'hidden' span that holds our MFK inputs
    const flex_styles = {
      "marginLeft"    : "auto",
      "display"       : "flex",
      "justifyContent": "space-between",
      "alignItems"    : "flex-end"
    };
    
    return (
      <FocusTrapZone>
        <FocusZone
          //focusElement={null}
          direction={FocusZoneDirection.horizontal}
          handleTabKey={TabTypes.inputOnly}
          isCircularNavigation={false}
          allowFocusRoot={false}>
        <form onBlur={() => this.onFieldBlur()}>
        <div 
          className="ms-slideRightIn20 ms-slideLeftOut20"
          style={flex_styles}>
            {this.renderField('FUND',       3, true)}
            {this.renderField('ORG',        2, true)}
            {this.renderField('DEPT',       4, true)}
            {this.renderField('SUB DEPT',   5, false)}
            {this.renderField('GRANT',      8, false)}
            {this.renderField('INST ACCT',  4, true)}
            {this.renderField('ORG ACCT',   3, false)}
            {this.renderField('DEPT ACCT',  5, false)}
            {this.renderField('FUNC',       2, true)}
            {this.renderField('COST CNTR',  4, false)}
          </div>
          </form>
        </FocusZone>
      </FocusTrapZone>
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
        {this.props.setup_required && <this.renderFieldRow/>}
        {this.props.setup_required &&

        <p></p>}
      </div>
    );
  }
}