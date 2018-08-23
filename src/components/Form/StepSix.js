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
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-lgPush1 ms-xl10 ms-xlPush1 ms-xxl8 ms-xxlPush2">
            
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
  fetchCourses: courseText => fetchCourses(courseText)
})


export default connect(mapStateToProps, mapDispatchToProps)(StepSix);