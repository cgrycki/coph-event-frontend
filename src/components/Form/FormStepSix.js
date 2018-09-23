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
import EventComments  from './fields/EventComments';



class Step extends React.Component {
  /** Sets web page title on mount */
  componentDidMount() {
    document.title = "Create an Event: Misc";
  }

  validate = () => {
    const { errors } = this.props;

    let validFlag = false;
    const pgFields = ['comments'];
    pgFields.forEach(field => { if (errors.hasOwnProperty(field)) validFlag = true; });

    return validFlag;
  }
  prevPage = () => this.props.history.goBack(-1);
  nextPage = () => this.props.history.push('/form/review');
  onChange = (field, value) => this.props.updateForm(field, value);

  render() {
    const { info, errors, updateForm } = this.props;

    return(
      <FormStep>
        <FormTitle progress={0.9} />
        
        <div className="ms-Grid-row ms-slideRight40 FormAlignStart">          
          <EventComments
            value={info['comments']}
            error={errors['comments']}
            onChange={updateForm}
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