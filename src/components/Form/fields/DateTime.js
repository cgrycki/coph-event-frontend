import React     from 'react';
import {
  isWeekend,
  isAfterHours
}                 from '../../../utils/date.utils';

// Fields
import DateField  from '../../common/DateField';
import TimeField  from '../../common/TimeField';

export default class DateTime extends React.Component {
  render() {
    const { 
      date, start_time, end_time, coph_email,
      start_time_error, end_time_error, coph_email_error,
      onChange
    } = this.props;

    // Inline flexible styling
    const flex_style = {
      'display'       : 'flex',
      'justifyContent': 'space-between',
      'minHeight'     : '120px'
    };

    // If either condition is true, show the COPH employee email input below date
    const displayCophEmail = isWeekend(date) || isAfterHours(start_time, end_time);

    return (
      <div className="FormFieldRow" style={flex_style}>
        <DateField
          date={date}
          displayCOPH={displayCophEmail}
          coph_email={coph_email}
          coph_email_error={coph_email_error}
          onChange={onChange}
        />

        <TimeField
          label={'Start Time'}
          field={'start_time'}
          value={start_time}
          error={start_time_error}
          onChange={onChange}
        />

        <TimeField
          label={'End Time'}
          field={'end_time'}
          value={end_time}
          error={end_time_error}
          onChange={onChange}
        />
      </div>
    );
  }
}