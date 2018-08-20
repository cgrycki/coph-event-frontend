import React          from 'react';
import { 
  DatePicker,
  DayOfWeek 
}                     from 'office-ui-fabric-react';
import { 
  sixMonthsFromToday, 
  getDateISO,
  getDateFromISO,
  datePickerStrings, 
  isWeekend 
}                     from '../../utils/date.utils';
import TextField      from './TextField';


export default class DateField extends React.PureComponent {
  parseDate(str) {
    /* Parses a JS date string into an ISO 8601 format before updating field. */
    const parsed = getDateISO(str);
    this.props.onChange('date', parsed);
  }

  renderCophEmail(value, error, onChange) {
    return (
      <div className="ms-slideDownIn20">
        <TextField
          label={"CoPH Employee Email"}
          placeholder={"Enter on-premises CoPH employee's email"}
          field={"coph_email"}
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

    // Conditionally set the value of the date picker
    const date_value = (date !== "") ? 
      new Date(getDateFromISO(date)) : 
      undefined;

    return (
      <div style={{'display': 'inline-block', 'width': '50%'}}>
        <DatePicker
          label={'Event Date'}
          placeholder={'Add a date for the event'} 
          value={date_value}
          firstDayOfWeek={DayOfWeek.Monday}
          minDate={new Date()}
          maxDate={sixMonthsFromToday()}
          isRequired={true}
          showGoToToday={false}
          strings={datePickerStrings}
          onSelectDate={(evt) => this.parseDate(evt)}
        />
        {isWeekend(date) && 
          this.renderCophEmail(coph_email, coph_email_error, onChange)}
      </div>
    );
  }
}