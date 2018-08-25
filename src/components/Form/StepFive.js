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
import Setup          from './fields/Setup';


class StepFive extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { info, errors, updateForm } = this.props;

    return(
      <FormStep>
        <FormTitle page={'placeholder'} progress={0.5} />
        
        <div className="ms-Grid-row">
          <Setup
            setup_required={info['setup_required']}
            setup_mfk={info['setup_mfk']}
            error={errors['setup_mfk']}
            onChange={updateForm}
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

const mapStateToProps = state => ({
  info: state.fields.info,
  errors: state.fields.errors
})

const mapDispatchToProps = dispatch => ({
  updateForm: (field, value) => dispatch(updateForm(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepFive);