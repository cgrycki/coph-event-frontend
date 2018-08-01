import React        from 'react';
import { ComboBox } from 'office-ui-fabric-react';
import options_time from '../../constants/time.constants';

const time_length = options_time.length;

// Renders a dropdown
export default class TimeField extends React.PureComponent {
  render() {
    let { field, label, value, onChange, error } = this.props;

    // Take the ends off of start/end times
    let sliced_times = (field === 'start_time') ?
      options_time.slice(0, time_length - 1) :
      options_time.slice(1, time_length);

    return (
      <div style={{'maxWidth': '110px'}}>
        <ComboBox
          label={label}
          options={sliced_times}
          text={(value !== '') ? value : undefined}
          errorMessage={error}
          required={true}
          autoComplete="on"
          useComboBoxAsMenuWidth={true}
          onChanged={(evt) => onChange(field, evt.key)}
        />
      </div>
    );
  }
}