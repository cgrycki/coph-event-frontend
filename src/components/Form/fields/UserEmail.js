import React from 'react';
import TextField from '../../common/TextField';

export default class UserEmail extends React.PureComponent {
  render() {
    let { value, error, onChange } = this.props;

    return (
      <div className="FormFieldRow">
        <TextField
          label={"User Email"}
          placeholder={"Enter your U. Iowa Email"}
          field={"user_email"}
          value={value}
          onChange={onChange}
          error={error}
          disabled={true}
        />
      </div>
    );
  }
}