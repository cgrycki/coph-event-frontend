import React from 'react';
import TextField from '../../common/TextField';

export default class EventComments extends React.Component {
  render() {
    let { value, error, onChange } = this.props;

    return (
      <TextField
        label={"Comments"}
        placeholder="Enter any additional notes."
        field={"comments"}
        value={value}
        onChange={onChange}
        error={error}
        required={false}
        multiline={true}
        rows={4}
    />
    );
  }
}