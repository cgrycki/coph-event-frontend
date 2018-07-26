import React from 'react';
import { connect } from 'react-redux';
import { DefaultButton } from 'office-ui-fabric-react';

import TextField from '../../common/TextField';
import FormButtons from '../FormButtons';
import Setup from './Setup';
import Course from './Course';
import { updateField, resetField } from '../../../actions/field.actions';


// Component
class StepTwoComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
    this.onInputChange = this.onInputChange.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  onInputChange(field, value) {
    this.props.dispatch(updateField(field, value));
  }

  prevPage() { 
    this.props.history.push("/form/"); 
  }

  nextPage() { 
    this.props.history.push("/form/event");
  }

  render() {
    return (
      <div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <p className="ms-fontSize-xl">User Information</p>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <TextField
              label={"User Email"}
              placeholder={"Enter your U. Iowa email"}
              value={this.props.info['user_email']}
              onChange={this.onInputChange}
              error={this.props.errors['user_email']}
              field={'user_email'}
            />

            <TextField
              label={"Contact Email"}
              placeholder={"event-planner@another.company.com"}
              value={this.props.info['contact_email']}
              onChange={this.onInputChange}
              error={this.props.errors['contact_email']}
              field={'contact_email'}
              required={false}
            />

            <Setup
              setup_required={this.props.info['setup_required']}
              setup_mfk={this.props.info['setup_mfk']}
              onChange={this.onInputChange}
            />

            <Course
              references_course={this.props.info['references_course']}
              referenced_course={this.props.info['referenced_course']}
              onChange={this.onInputChange}
            />
          </div>
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          disabled={false}
        />
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  info      : state.fields.info,
  errors    : state.fields.errors,
  user_email: state.app.user_email
})

export default connect(mapStateToProps)(StepTwoComponent);