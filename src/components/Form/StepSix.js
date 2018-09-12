// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import {updateForm}  from '../../actions/form.actions';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';

// Form fields
import EventComments  from './fields/EventComments';


class StepSix extends React.Component {

  validate = () => {
    if (this.props.errors['comments']) return true;
    else return false;
  }

  render() {
    return(
      <FormStep>
        <FormTitle page={'Comments'} progress={0.9} />
        
        <div className="ms-Grid-row FormAlignStart">
          <div className="ms-Grid-col ms-sm12">
            <EventComments
              value={this.props.info['comments']}
              error={this.props.errors['comments']}
              onChange={this.props.updateForm}
            />
          </div>
        </div>

        <FormButtons
          prevPage={() => this.props.history.goBack(-1)}
          nextPage={() => this.props.history.push("/form/review")}
          prevDisabled={false}
          nextDisabled={this.validate()}
        />
      </FormStep>
    );
  }
}


// Container
const mapStateToProps = state => ({
  info   : state.form.fields,
  errors : state.form.errors
})

const mapDispatchToProps = dispatch => ({
  updateForm  : (field, value) => dispatch(updateForm(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepSix);