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
import Setup from './fields/Setup.1';


class StepFive extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <FormStep>
        <FormTitle page={'placeholder'} progress={0.5} />
        
        <div className="ms-Grid-row">
          <Setup
            setup_required={this.props.info.setup_required}
            setup_mfk={this.props.info.setup_mfk}
            error={this.props.errors.setup_mfk}
            onChange={this.props.onChange}
          />
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


// Redux Container
const mapStateToProps = state => ({
  info: state.fields.info,
  errors: state.fields.errors
})

const mapDispatchToProps = dispatch => ({
  onChange: (field, value) => dispatch(updateForm(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);