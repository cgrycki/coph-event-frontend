// Dependecies
import React            from 'react';
import { connect }      from 'react-redux';
import { updateField }  from '../../actions/field.actions';

// Form components
import FormTitle        from './shared/FormTitle';
import FormStep         from './shared/FormStep';
import FormButtons      from './shared/FormButtons';

// Form fields
import Setup            from './fields/Setup';
import Course           from './fields/Course';
import UserEmail        from './fields/UserEmail';
import ContactEmail     from './fields/ContactEmail';


// Component
class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  prevPage() {
    this.props.history.push("/");
  }

  nextPage() {
    this.props.history.push("/form/event");
  }

  onChange(field, value, error=undefined) {
    this.props.dispatch(updateField(field, value));
  }

  render() {
    let { info, errors } = this.props;

    return (
      <div>
        <FormTitle page={"User"} />

        <FormStep>
          <UserEmail
            value={info['user_email']}
            error={errors['user_email']}
            onChange={this.onChange}
          />
          
          <ContactEmail
            value={info['contact_email']}
            error={errors['contact_email']}
            onChange={this.onChange}
          />

          <Setup
            setup_required={info['setup_required']}
            setup_mfk={info['setup_mfk']}
            onChange={this.onChange}
          />

          <Course
            references_course={info['references_course']}
            referenced_course={info['referenced_course']}
            onChange={this.onChange}
          />
        </FormStep>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={false}
        />
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  info  : state.fields.info,
  errors: state.fields.errors
});

export default connect(mapStateToProps)(StepOne);