import React  from 'react';
import { 
  Toggle, 
  Label, 
  TextField
}             from 'office-ui-fabric-react';





/**
 * Renders the HTML field to input U. Iowa MFK number if setup is required
 */
export default class Setup extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        FUND          : '',
        ORG           : '',
        DEPT          : '',
        SUBDEPT       : '',
        GRANT         : '',
        INST_ACCT     : '',
        ORG_ACCT      : '',
        DEPT_ACCT     : '',
        FUNC_COST_CNTR: ''
      },
      focused: 'FUND',
      focus: {
        FUND          : 'ORG',
        ORG           : 'DEPT',
        DEPT          : 'SUBDEPT',
        SUBDEPT       : 'GRANT',
        GRANT         : 'INST_ACCT',
        INST_ACCT     : 'ORG_ACCT',
        ORG_ACCT      : 'DEPT_ACCT',
        DEPT_ACCT     : 'FUNC_COST_CNTR',
        FUNC_COST_CNTR: ''
      }
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.createField   = this.createField.bind(this);
  }

  /** Updates store with toggle information and autotabs to/from inputs. */
  //onToggle() {}

  /** Sets the ~component~ field state */
  onFieldChange(field, e, maxLength) {
    e.preventDefault();

    
    console.log(field, e, maxLength, this.state);
    const value = e.target.value;

    // Check if this input has reached it's max length
    if (value.length < maxLength) return;
    else if (value.length === maxLength) {
      // Move focus to the next input
      const nextFocus = this.state.focus[field];


      var evt = new Event("keydown");
      evt.key = "Tab";
      evt.code = "Tab";
      evt.keyCode = 9;
      evt.which = 9;
      evt.altKey = false;
      evt.ctrlKey = false;
      evt.shiftKey = false;
      evt.metaKey = false;
      //evt.bubbles = true;
      document.dispatchEvent(evt);
      console.log(evt);




      // Set the component information
      const updatedFields = { ...this.state.fields, [field]: value };
      this.setState({ 
        fields: updatedFields,
        focused: nextFocus
      });
    }
  }

  /** Sets the ~store~ setup field state after user has left the input group */
  //onFieldBlur() {}

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
      "justifyContent": "space-between",
      "alignItems"    : "flex-end"
    };

    return (
      <div 
        className="ms-slideRightIn20 ms-slideLeftOut20"
        style={flex_styles}
      >
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

  createField(maxLength, disabled, required, label, value) {
    return (
      <TextField
        disabled={disabled}
        required={required}
        label={label}
        value={value}
        maxLength={maxLength}
        onChange={(evt) => this.onFieldChange(label, evt, maxLength)}
      />
    );
  }

  render() {
    // Styles the row 
    const setup_styles = {
      "padding"       : "0px 8px",
      "boxSizing"     : "border-box",
      "display"       : "flex",
      "justifyContent": "flex-start",
      "flexDirection" : "row"
    }

    const { setup_required, error, onChange } = this.props;
    const { fields, focused } = this.state;

    return (
      <div className="ms-Grid-row" style={setup_styles}>
        <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg4 ms-xl4 ms-xxl4">
          <Toggle
            label={"Furniture and setup required?"}
            onText="Yes"
            offText="No"
            value={setup_required}
            onChanged={(evt) => onChange('setup_required', evt)}
          />
        </div>
        {/*this.props.setup_required && this.renderFieldRow()*/}

        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg8 ms-xl7 ms-xlPush1 ms-slideRightIn20 ms-slideLeftOut20">
          {this.createField(3, !setup_required, true, "FUND", fields.FUND)}
          {this.createField(3, !setup_required, true, "ORG", fields.ORG)}
        </div>
      </div>
    );
  }
}