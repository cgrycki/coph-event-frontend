import React from 'react';
import TextField from '../../common/TextField';

export default class ContactEmail extends React.PureComponent {
  render() {
    let { value, error, onChange } = this.props;

    return (
      <TextField
        label={"Contact Email"}
        placeholder={"Enter the email of offsite event planner"}
        field={"contact_email"}
        value={value}
        onChange={onChange}
        error={error}
        required={false}
      />
    );
  }
}