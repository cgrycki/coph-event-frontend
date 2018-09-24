// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import { updateForm } from '../../actions/form.actions';

// Form components + fields
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';
import UserEmail      from './fields/UserEmail';
import ContactEmail   from './fields/ContactEmail';
import Attendance     from './fields/Attendance';


class Step extends React.Component {
  prevPage = () => this.props.history.goBack(-1);
  nextPage = () => this.props.history.push('/form/what');
  onChange = (field, value) => this.props.updateForm(field, value);

  render() {
    const { info, errors } = this.props;

    return(
      <FormStep>
        <FormTitle page={'Who'} progress={0.15} />
        
        <div className="ms-Grid-row ms-slideRight40 FormFields">
        
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
  info  : state.form.fields,
  errors: state.form.errors
})

const mapDispatchToProps = dispatch => ({
  updateForm: (field, value) => dispatch(updateForm(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Step);