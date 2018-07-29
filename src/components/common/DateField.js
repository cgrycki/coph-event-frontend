import React from 'react';
import { DatePicker } from 'office-ui-fabric-react';
import { nextWeek, datePickerStrings, isWeekend } from '../../utils/date.utils';
import TextField from './TextField';


export default class DateField extends React.PureComponent {
  renderCophEmail(value, error, onChange) {
    return (
      <div>
        <TextField
          label={'CoPH Employee Email'}
          placeholder={"Enter on-premises CoPH employee's email"}
          field_name={'coph_email'}
          value={value}
          error={error}
          onChange={onChange}
        />
      </div>
    );
  }

  render() {
    let { 
      date, date_error, 
      coph_email, coph_email_error,
      onChange
    } = this.props;
    
    return (
      <div style={{'display': 'inline-block', 'width': '50%'}}>
        <DatePicker
          label={'Event Date'}
          placeholder={'Add a date for the event'} 
          value={date}
          minDate={nextWeek()}
          isRequired={true}
          showGoToToday={false}
          strings={datePickerStrings}
          onSelectDate={(evt) => onChange('date', evt)}
        />
        {isWeekend(date) && 
          this.renderCophEmail(coph_email, coph_email_error, onChange)}
      </div>
    );
  }
}