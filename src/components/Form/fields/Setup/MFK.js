import React from 'react';
import { setup_mfk_fields } from '../../../../constants/fieldTypes';
import { 
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements as TabTypes
} from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import LabelRender from '../../../common/LabelRender';


const row_style = {
  "marginLeft"    : "auto",
  "display"       : "flex",
  "justifyContent": "space-between",
  "alignItems"    : "flex-end"
};


export default class MFK extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      setup_mfk: { ...props.setup_mfk },
      focused  : '#MFK--FUND'
    };

    this.onFieldChange = this.onFieldChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ setup_mfk: nextProps.setup_mfk });
  }

  /** Renders the Text Fields with autotabbing */
  render() {
    const info = 'In the unlikely event that extra maintenance or repairs are required following an event, any costs will be assessed along to the event sponsor.\n';
    const rowClass = !this.props.disabled ? 'SetupMFKRow--Active' : '';
    return (
      <FocusZone
        direction={FocusZoneDirection.horizontal}
        handleTabKey={TabTypes.inputOnly}
        isCircularNavigation={false}
        allowFocusRoot={false}>
        <LabelRender
          label="MFK Number"
          info={info}
          required={!this.props.disabled}
        />
        <div 
          className={`ms-slideRightIn20 ms-slideLeftOut20 SetupMFKRow ${rowClass}`}
          style={row_style}>
          {setup_mfk_fields.map((field, idx) => {
            return (
              <div key={idx}>
                <TextField
                  label={field.label}
                  required={field.required && !this.props.disabled}
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
    const field = setup_mfk_fields[idx];

    // Update the store: component will recieve props
    const new_setup = { ...this.state.setup_mfk, [field.field]: evt.target.value };
    this.props.onChange('setup_mfk', new_setup);

    // Check if we should advance inputs
    if ((evt.target.value.length >= field.maxLength) && (idx+1 < setup_mfk_fields.length)) {
      // Create a ID selector for next input
      let next_input_field = setup_mfk_fields[idx+1].field;
      let next_input_id    = `#MFK--${next_input_field}`;
      let next_input       = document.querySelector(next_input_id);
      next_input.focus();
    }
  }
}