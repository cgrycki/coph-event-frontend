import React from 'react';
import { 
  TextField,
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements as TabTypes
} from 'office-ui-fabric-react';



const row_style = {
  "marginLeft"    : "auto",
  "display"       : "flex",
  "justifyContent": "space-between",
  "alignItems"    : "flex-end"
};

const fields = [
  {
    label: 'FUND',
    field: 'FUND',
    maxLength: 3,
    required: true
  },
  {
    label: 'ORG',
    field: 'ORG',
    maxLength: 2,
    required: true
  },
  {
    label: 'DEPT',
    field: 'DEPT',
    maxLength: 4,
    required: true
  },
  {
    label: 'SUB DEPT',
    field: 'SUBDEPT',
    maxLength: 5,
    required: false
  },
  {
    label: 'GRANT',
    field: 'GRANT',
    maxLength: 8,
    required: false
  },
  {
    label: 'INST ACCT',
    field: 'INSTACCT',
    maxLength: 4,
    required: true
  },
  {
    label: 'ORG ACCT',
    field: 'ORGACCT',
    maxLength: 3,
    required: false
  },
  {
    label: 'DEPT ACCT',
    field: 'DEPTACCT',
    maxLength: 5,
    required: false
  },
  {
    label: 'FUNC',
    field: 'FUNC',
    maxLength: 2,
    required: true
  },
  {
    label: 'COST CNTR',
    field: 'COSTCNTR',
    maxLength: 4,
    required: false
  }
];


export default class MFK extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      setup_mfk: { ...props.setup_mfk },
      focused  : '#MFK--FUND'
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFieldsBlur  = this.onFieldsBlur.bind(this);
  }

  /** Renders the Text Fields with autotabbing */
  render() {
    return (
      <FocusZone
        direction={FocusZoneDirection.horizontal}
        handleTabKey={TabTypes.inputOnly}
        isCircularNavigation={false}
        allowFocusRoot={false}>
        <div 
          className="ms-slideRightIn20 ms-slideLeftOut20" 
          style={row_style}
          onBlur={this.onFieldsBlur}>
          {fields.map((field, idx) => {
            return (
              <div key={idx}>
                <TextField
                  focusElement={el => console.log(el)}
                  label={field.label}
                  required={field.required}
                  id={`MFK--${field.field}`}
                  className='FormSetupInput'
                  maxLength={field.maxLength}
                  value={this.state.setup_mfk[field.field]}
                  onChange={evt => this.onFieldChange(idx, evt)}
                />
              </div>);
          })}
        </div>
      </FocusZone>
    );
  }

  /** Update component data and focus automagically */
  onFieldChange(idx, evt) {
    // Get field properties by looking up field in array via index.
    const field = fields[idx];

    // Check if we should advance inputs
    if ((evt.target.value.length >= field.maxLength) && (idx+1 < fields.length)) {
      // Create a ID selector for next input
      let next_input_field = fields[idx+1].field;
      let next_input_id    = `#MFK--${next_input_field}`;
      let next_input       = document.querySelector(next_input_id);
      next_input.focus();
    };

    // Update the field regardless
    let new_setup = { ...this.state.setup_mfk, [field.field]: evt.target.value };
    this.setState({ setup_mfk: new_setup });
  }

  /** Event listener that updates our store when the fields row loses focus */
  onFieldsBlur(evt) {
    evt.preventDefault();

    // Get the reference to our focus zone
    let currentTarget = evt.currentTarget;

    // Keep a reference to the component while in timeout function
    let component = this;

    // Check if our focus zone contains the active element
    setTimeout(function() {
      if (!currentTarget.contains(document.activeElement)) {
        // If it doesn't then we should update our store
        component.props.onChange('setup_mfk', component.state.setup_mfk);
      }}, 1);
  }
}