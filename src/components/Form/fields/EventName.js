import React from 'react';
import TextField from '../../common/TextField';

export default class EventName extends React.PureComponent {
  render() {
    let { value, error, onChange } = this.props;

    return (
      <div className="FormFieldRow">
        <TextField
          label={"Event Name"}
          placeholder={"Add a title for the event"}
          field={"event_name"}
          value={value}
          onChange={onChange}
          error={error}
          autofocus={true}
        />
      </div>
    );
  }
}