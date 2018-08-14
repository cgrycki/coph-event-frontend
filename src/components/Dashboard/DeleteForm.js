import React from 'react';
import { 
  TextField, 
  DefaultButton 
} from 'office-ui-fabric-react';
import { deleteEvent }   from '../../actions/event.actions';


export default class DeleteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      package_id: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(evt) {
    this.setState({ package_id: evt });
  }

  onSubmit() {
    const { dispatch } = this.props;
    const { package_id } = this.state;
    console.log(dispatch, package_id);

    dispatch(deleteEvent(+package_id));
  }

  render() {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm8">
          <TextField
            label={'Package to Delete'}
            onChanged={this.onChange}
            value={this.state.package_id}
          />
        </div>
        <div className="ms-Grid-col ms-sm4">
          <DefaultButton
            primary={true}
            text="Delete Event"
            onClick={this.onSubmit}
            style={{display: 'flex', alignSelf: 'flex-end'}}
          />
        </div>
      </div>
    );
  }
}