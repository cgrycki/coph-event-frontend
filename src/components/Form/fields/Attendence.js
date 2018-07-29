import React from 'react';
import { TextField, Label } from 'office-ui-fabric-react';


/**
 * Renders the Expected Attendance field and row.
 */
export default class Attendance extends React.PureComponent {
  render() {
    let { value, error, onChange } = this.props;

    // Styles the row 
    const attendance_styles = {
      marginLeft: "0px"
    };

    return (
      <div className="ms-Grid-row" style={attendance_styles}>
        <Label required>Expected Attendance</Label>
        <input
          className="ms-normalize"
          type="number"
          value={value}
          onChange={(evt) => onChange('num_people', evt.target.value)}
        />
        {error && <span>{error}</span>}
      </div>
    );
  }
}