import React          from 'react';
import { TextField }  from 'office-ui-fabric-react/lib/TextField';
import Prompt         from './Prompt';
import './Comments.css';


export default class Comments extends React.Component {
  
  render() {
    const { value, error, onChange, room } = this.props;

    return (
      <React.Fragment>
        <div className="FormFieldRow">
          <Prompt room={room} />
        </div>
        
        <div className="FormFieldRow">
          <TextField
            className="Comments--input"
            label={"Comments"}
            placeholder="Enter additional notes, or anything we might have missed."
            value={value}
            onChange={evt => onChange('comments', evt.target.value)}
            errorMessage={error}
            required={false}
            multiline={true}
            rows={4}
          />
        </div>
      </React.Fragment>
    );
  }
}