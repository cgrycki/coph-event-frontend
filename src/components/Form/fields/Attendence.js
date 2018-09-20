import React from 'react';
import { TextField, Label } from 'office-ui-fabric-react';


/**
 * Renders the Expected Attendance field and row.
 */
export default class Attendance extends React.Component {
  render() {
    const { value, error, onChange } = this.props;

    // Styles the row 
    const attendance_styles = {
      height  : "32px",
      display : "border-box",
      padding : "0px 0px 0px 12px"
    };

    return (
      <div className="ms-Grid-row FormFieldRow">
        <Label required>Expected Attendance</Label>
        <input
          className="ms-normalize"
          style={attendance_styles}
          type="number"
          value={value}
          onChange={(evt) => onChange('num_people', evt.target.value)}
          min={1}
          max={200}
        />
        {error && <span>{error}</span>}
      </div>
    );
  }
}