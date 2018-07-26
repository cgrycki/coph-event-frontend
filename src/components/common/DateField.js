import React from 'react';
import { TextField, DatePicker, Label } from 'office-ui-fabric-react';
import { nextWeek, datePickerStrings } from '../../utils/date.utils';

export default class DateField extends React.PureComponent {
  render() {
    return (
      <DatePicker
        label={this.props.label}
        value={this.props.value}
        placeholder={this.props.placeholder}
        minDate={nextWeek()}
        isRequired={true}
        showGoToToday={false}
        strings={datePickerStrings}
        onSelectDate={(evt) => this.props.onChange('date', evt)}
      />
    );
  }
}