import React from 'react';
import TextField from '../../common/TextField';

export default class EventComments extends React.Component {
  render() {
    let { value, error, onChange } = this.props;

    return (
      <div className="FormFieldRow">
        <TextField
          label={"Comments"}
          placeholder="Enter additional notes, or anything we might have missed."
          field={"comments"}
          value={value}
          onChange={onChange}
          error={error}
          required={false}
          multiline={true}
          rows={4}
      />
    </div>
    );
  }
}