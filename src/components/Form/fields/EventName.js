import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';


export default class EventName extends React.Component {
  render() {
    const { value, error, onChange } = this.props;

    return (
      <div className="FormFieldRow">
        <TextField
          label={"Event Name"}
          placeholder={"Add a title for the event"}
          required={true}
          value={value}
          onChange={evt => onChange('event_name', evt.target.value)}
          errorMessage={error}
          autofocus={true}
        />
      </div>
    );
  }
}