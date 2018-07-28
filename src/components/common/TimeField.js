import React from 'react';
import { ComboBox } from 'office-ui-fabric-react';

// Options for our time inputs
const options_time = [
  {key: "7:00 AM", text: "7:00 AM"},
  {key: "7:30 AM", text: "7:30 AM"},
  {key: "8:00 AM", text: "8:00 AM"},
  {key: "8:30 AM", text: "8:30 AM"},
  {key: "9:00 AM", text: "9:00 AM"},
  {key: "9:30 AM", text: "9:30 AM"},
  {key: "10:00 AM", text: "10:00 AM"},
  {key: "10:30 AM", text: "10:30 AM"},
  {key: "11:00 AM", text: "11:00 AM"},
  {key: "11:30 AM", text: "11:30 AM"},
  {key: "12:00 AM", text: "12:00 AM"},
  {key: "12:30 AM", text: "12:30 AM"},
  {key: "1:00 PM", text: "1:00 PM"},
  {key: "1:30 PM", text: "1:30 PM"},
  {key: "2:00 PM", text: "2:00 PM"},
  {key: "2:30 PM", text: "2:30 PM"},
  {key: "3:00 PM", text: "3:00 PM"},
  {key: "3:30 PM", text: "3:30 PM"},
  {key: "4:00 PM", text: "4:00 PM"},
  {key: "4:30 PM", text: "4:30 PM"},
  {key: "5:00 PM", text: "5:00 PM"},
  {key: "5:30 PM", text: "5:30 PM"},
  {key: "6:00 PM", text: "6:00 PM"},
  {key: "6:30 PM", text: "6:30 PM"},
  {key: "7:00 PM", text: "7:00 PM"},
  {key: "7:30 PM", text: "7:30 PM"},
  {key: "8:00 PM", text: "8:00 PM"},
  {key: "8:30 PM", text: "8:30 PM"},
  {key: "9:00 PM", text: "9:00 PM"}
];

// Renders a dropdown
export default class TimeField extends React.PureComponent {
  render() {
    let { field, label, value, onChange } = this.props;

    return (
      <div style={{'maxWidth': '100px'}}>
        <ComboBox
          label={label}
          options={options_time}
          value={value}
          required={true}
          autoComplete="on"
          useComboBoxAsMenuWidth={true}
          onChanged={(evt) => onChange(field, evt.text)}
        />
      </div>
    );
  }
}