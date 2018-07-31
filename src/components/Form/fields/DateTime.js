import React from 'react';

// Fields
import DateField from '../../common/DateField';
import TimeField from '../../common/TimeField';

export default class DateTime extends React.PureComponent {
  render() {
    let { 
      date, start_time, end_time, coph_email,
      start_time_error, end_time_error, coph_email_error,
      onChange
    } = this.props;

    // Inline flexible styling
    const flex_style = {
      'display': 'flex', 
      'justifyContent': 'space-between'
    };

    return (
      <div style={flex_style}>
        <DateField
          date={date}
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