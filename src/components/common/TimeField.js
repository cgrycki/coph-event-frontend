import React        from 'react';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import options_time from '../../constants/time.constants';
import LabelRender  from './LabelRender';

const time_length = options_time.length;


// Renders a dropdown
export default class TimeField extends React.Component {
  renderLabel = (label, info) => {
    return (<LabelRender label={label} info={info} required={true} />);
  }

  render() {
    const { field, label, value, onChange, error } = this.props;

    // Take the ends off of start/end times
    let sliced_times = (field === 'start_time') ?
      options_time.slice(0, time_length - 1) :
      options_time.slice(1, time_length);

    const info = 'The entrances of the College of Public Health Buidling are normally open from 7:00 AM – 9:00 PM Monday – Friday';

    return (
      <div style={{'maxWidth': '110px'}}>
        {this.renderLabel(label, info)}
        <ComboBox
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