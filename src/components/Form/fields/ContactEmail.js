import React from 'react';
import TextField from '../../common/TextField';
//import { TextField } from 'office-ui-fabric-react/lib/TextField';
import LabelRender from '../../common/LabelRender';


export default class ContactEmail extends React.Component {
  renderLabel = (info, label) => {
    return (<LabelRender label={label} info={info} required={false} />);
  }
  
  render() {
    const { value, error, onChange } = this.props;
    const info = "Enter another email if you have an event coordinator or are filling out this form on behalf of someone else.\n";

    return (
      <div>
        <LabelRender
          label="Contact Email"
          info={info}
          required={false}
        />
        <TextField
          placeholder={"Enter the email of offsite event planner"}
          field={"contact_email"}
          value={value}
          onChange={onChange}
          error={error}
          required={false}
          autofocus={true}
        />
      </div>
    );
  }
}