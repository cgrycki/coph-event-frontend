import React          from 'react';
import { 
  DatePicker,
  DayOfWeek 
}                     from 'office-ui-fabric-react';
import { TextField }  from 'office-ui-fabric-react/lib/TextField';
import { 
  sixMonthsFromToday, 
  getDateISO,
  getDateFromISO,
  datePickerStrings
}                     from '../../utils/date.utils';
import LabelRender    from './LabelRender';


export default class DateField extends React.Component {
  parseDate(str) {
    /* Parses a JS date string into an ISO 8601 format before updating field. */
    const parsed = getDateISO(str);
    this.props.onChange('date', parsed);
  }

  renderLabel = (label, info, required) => {
    return (<LabelRender label={label} info={info} required={required} />)
  }

  renderCophEmail(value, error, onChange) {
    const label = 'CoPH Employee Email';
    const info  = ' If you are making a request for space outside of the normal building hours, a College of Public Health departmental sponsor is required. Units making reservations will be required to identify a departmental faculty or staff member who will be present on-site during the event and responsible for clean-up.\n\n' +
      'You will also be asked to note the time in which the building or rooms need to be opened and closed so that CPH Facilities can make the necessary adjustments with UI Facilities Management Access Control prior to your event.';

    return (
      <div className="ms-slideDownIn20">
        <TextField
          onRenderLabel={() => this.renderLabel(label, info, true)}
          placeholder={"Enter on-premises CoPH employee's email"}
          field={"coph_email"}
          value={value}
          errorMessage={error}
          onChange={onChange}
        />
      </div>
    );
  }

  render() {
    const { date, coph_email, coph_email_error, onChange } = this.props;

    // Conditionally set the value of the date picker
    const date_value = (date !== "") ? new Date(getDateFromISO(date)) : undefined;

    // Label information
    const label = 'Event Date';
    const info  = "-Events held Spring Semester can be reserved beginning Sept. 15\n -Events held Summer Semester can be reserved beginning Oct. 15\n -Events held Fall Semester can be reserved beginning Jan. 15\n\n";

    return (
      <div style={{'display': 'inline-block', 'width': '50%'}}>
        {this.renderLabel(label, info, true)}
        <DatePicker
          // label={'Event Date'}
          placeholder={'Add a date for the event'} 
          value={date_value}
          firstDayOfWeek={DayOfWeek.Monday}
          minDate={new Date()}
          maxDate={sixMonthsFromToday()}
          showGoToToday={false}
          strings={datePickerStrings}
          onSelectDate={(evt) => this.parseDate(evt)}
        />
        {coph_email_error &&  this.renderCophEmail(coph_email, coph_email_error, onChange)}
      </div>
    );
  }
}