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
import EventName      from './fields/EventName';
import FoodDrink      from './fields/FoodDrink';
import Course         from './fields/Course';
import Setup          from './fields/Setup/';


class Step extends React.Component {
  /** Sets web page title on mount */
  componentDidMount() {
    document.title = "Create an Event: What";
  }

  validate = () => {
    const { info, errors } = this.props;

    // Only field we *need* from this step is the event name
    if (info['event_name'] === '') return true;

    let validFlag = false;
    const pgFields = [
      'event_name',
      'food_drink_provider', 'food_provider_error', 'alcohol_provider_error', 
      'references_course_error', 'referenced_course', 'setup_required'
    ];
    pgFields.forEach(field => { if (errors.hasOwnProperty(field)) validFlag = true; });

    return validFlag;
  }
  prevPage = () => this.props.history.push('/form/who');
  nextPage = () => this.props.history.push('/form/when');
  onChange = (field, value) => this.props.updateForm(field, value);

  render() {
    const { info, errors } = this.props;

    return(
      <FormStep>
        <FormTitle progress={0.3} />
        
        <div className="ms-Grid-row ms-slideRight40 FormAlignStart">
          <EventName
            value={info['event_name']}
            error={errors['event_name']}
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

          <Setup
            setup_required={info['setup_required']}
            setup_mfk={info['setup_mfk']}
            setup_error={errors['setup_required']}
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