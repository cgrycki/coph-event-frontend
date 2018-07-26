import React from 'react';
import { DatePicker } from 'office-ui-fabric-react';
import { nextWeek, datePickerStrings } from '../../utils/date.utils';

export default class DateField extends React.PureComponent {
  render() {
    return (
      <div style={{'display': 'inline-block', 'width': '50%'}}>
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
      </div>
    );
  }
}