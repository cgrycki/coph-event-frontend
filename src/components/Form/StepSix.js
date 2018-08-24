// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import {updateForm}  from '../../actions/field.actions';
import {fetchCourses}from '../../actions/room.actions';

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
              courses={this.props.courses}
              loading={this.props.loading}
              error={this.props.error}
              fetchCourses={this.props.fetchCourses}
              references_course={this.props.info.references_course}
              referenced_course={this.props.info.referenced_course}
              fieldError={this.props.errors['references_course']}
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
  courses: state.rooms.courses,
  loading: state.rooms.course_loading,
  error  : state.rooms.course_error,
  info   : state.fields.info,
  errors : state.fields.errors
})

const mapDispatchToProps = dispatch => ({
  updateForm  : (field, value) => dispatch(updateForm(field, value)),
  fetchCourses: courseText => dispatch(fetchCourses(courseText))
})


export default connect(mapStateToProps, mapDispatchToProps)(StepSix);