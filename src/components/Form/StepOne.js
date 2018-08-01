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
  }

  prevPage() {
    this.props.history.goBack(-1);
  }

  nextPage() {
    this.props.history.push("/form/event");
  }

  onChange(field, value) {
    this.props.dispatch(updateField(field, value));
  }

  render() {
    let { info, errors } = this.props;

    return (
      <FormStep>
        <FormTitle page={"User Information"} />

        <div>
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

        <Attendance
          value={info['num_people']}
          error={errors['num_people']}
          onChange={this.onChange}
        />

        <Setup
          setup_required={info['setup_required']}
          setup_mfk={info['setup_mfk']}
          setup_error={errors['setup_mfk']}
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
          onChange={this.onChange}
        />
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={true}
          nextDisabled={false}
        />
      </FormStep>
    );
  }
}

// Container
const mapStateToProps = state => ({
  info  : state.fields.info,
  errors: state.fields.errors
});

export default connect(mapStateToProps)(StepOne);