// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import {updateForm}  from '../../actions/field.actions';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';

// Form fields
import Course         from './fields/Course';


class StepSix extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <FormStep>
        <FormTitle page={'placeholder'} progress={0.5} />
        
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
            <Course
              references_course={this.props.info.references_course}
              referenced_course={this.props.info.referenced_course}
              error={this.props.errors['referenced_course']}
              onChange={this.props.updateForm}
            />
          </div>
        </div>

        <FormButtons
          prevPage={undefined}
          nextPage={undefined}
          prevDisabled={false}
          nextDisabled={false}
        />
      </FormStep>
    );
  }
}


// Container
const mapStateToProps = state => ({
  info   : state.fields.info,
  errors : state.fields.errors
})

const mapDispatchToProps = dispatch => ({
  updateForm  : (field, value) => dispatch(updateForm(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepSix);