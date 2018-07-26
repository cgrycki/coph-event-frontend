import React from 'react';
import { Label } from 'office-ui-fabric-react';

export default class TimeField extends React.PureComponent {
  render() {
    let { field, label, value, onChange } = this.props;

    return (
      <div className="FormTime">
        <Label required={true}>{label}</Label>
        <input
          className="ms-normalize"
          value={value}
          type={'time'}
          min={'08:30'}
          max={'20:00'}
          required={true}
          onChange={(evt) => onChange(field, evt.target.value)}
        />
      </div>
    );
  }
}