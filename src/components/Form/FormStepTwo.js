// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import { updateForm } from '../../actions/form.actions';

// Form components + fields
import {
  FormStep,
  FormTitle,
  FormButtons
}                     from './shared';
import UserEmail      from './fields/UserEmail';
import ContactEmail   from './fields/ContactEmail';
import Attendance     from './fields/Attendence';


class Step extends React.Component {
  /** Set page title on mount */
  componentDidMount() {
    document.title = "Create an Event: Who";
  }

  validate = () => {
    const { errors } = this.props;
    let validFlag = false;
    const pgFields = ['contact_email', 'num_people'];
    pgFields.forEach(field => { if (errors.hasOwnProperty(field)) validFlag = true; });

    return validFlag;
  }
  prevPage = () => this.props.history.push('/form/terms');
  nextPage = () => this.props.history.push('/form/what');
  onChange = (field, value) => this.props.updateForm(field, value);

  render() {
    const { info, errors } = this.props;

    return(
      <FormStep>
        <FormTitle progress={0.15} />
        
        <div className="ms-Grid-row ms-slideRight40 FormAlignStart">
          <UserEmail value={info['user_email']} />
          
          <ContactEmail
            value={info['contact_email']}
            error={errors['contact_email']}
            onChange={this.onChange}
          />

          <Attendance
            value={info['num_people']}
            error={errors['num_people']}
            onChange={this.onChange}
          />
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={this.validate()}
        />
      </FormStep>
    );
  }
}

const mapStateToProps = state => ({
  info  : state.form.fields,
  errors: state.form.errors
})

const mapDispatchToProps = dispatch => ({
  updateForm: (field, value) => dispatch(updateForm(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Step);