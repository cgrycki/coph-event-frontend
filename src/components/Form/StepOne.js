// Dependecies
import React            from 'react';
import { connect }      from 'react-redux';
import { updateForm }   from '../../actions/field.actions';

// Form components
import FormTitle        from './shared/FormTitle';
import FormStep         from './shared/FormStep';
import FormButtons      from './shared/FormButtons';

// Form fields
import Setup            from './fields/Setup/';
import Course           from './fields/Course';
import Attendance       from './fields/Attendence';
import UserEmail        from './fields/UserEmail';
import ContactEmail     from './fields/ContactEmail';
import FoodDrink        from './fields/FoodDrink';


// Component
class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    /* Set web page title on mount. */
    document.title = "Create Event: User";
  }

  prevPage() {
    this.props.history.goBack(-1);
  }

  nextPage() {
    this.props.history.push("/form/event");
  }

  onChange(field, value) {
    this.props.dispatch(updateForm(field, value));
  }

  validate() {
    let { errors } = this.props;
    
    // If our store's errors have any keys, return true to disable
    let needed_flag = false,
        needed = [
        'contact_email', 'num_people', 
        'food_drink_provider', 'food_provider_error', 'alcohol_provider_error', 
        'references_course_error', 'referenced_course_error',
        'setup_required'
      ];
    needed.forEach(field => {
      if (errors.hasOwnProperty(field)) needed_flag = true;
    });
    
    if (needed_flag) return true;
    else return false;
  }

  render() {
    let { info, errors } = this.props;

    return (
      <FormStep>
        <FormTitle page={"User Information"} progress={0.25} />

        <div className="ms-slideRightIn40 FormFields">
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

          <Setup
            setup_required={info['setup_required']}
            setup_mfk={info['setup_mfk']}
            setup_error={errors['setup_required']}
            onChange={this.onChange}
          />

          <Course
            references_course={info['references_course']}
            referenced_course={info['referenced_course']}
            error={errors['referenced_course']}
            onChange={this.onChange}
          />

          <FoodDrink
            food_drink_required={info['food_drink_required']}
            food_provider={info['food_provider']}
            alcohol_provider={info['alcohol_provider']}
            food_drink_error={errors['food_drink_provider']}
            food_provider_error={errors['food_provider_error']}
            alcohol_provider_error={errors['alcohol_provider_error']}
            onChange={this.onChange}
          />
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={true}
          nextDisabled={this.validate()}
        />
      </FormStep>
    );
  }
}

// Container
const mapStateToProps = state => ({
  info      : state.fields.info,
  errors    : state.fields.errors
});

export default connect(mapStateToProps)(StepOne);