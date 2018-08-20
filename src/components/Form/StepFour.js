// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';
import { 
  MessageBar, 
  MessageBarType,
  Link 
}                     from 'office-ui-fabric-react';
import {error_style}  from '../../constants/styles';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';
import Details        from '../common/Details';
import Popup          from '../common/Popup';

// Actions
import { submitForm } from '../../actions/field.actions';


// Component
class StepFour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupHidden  : true,
      popupType    : 'submit',
      popupYesClick: this.submitForm
    };

    this.prevPage        = this.prevPage.bind(this);
    this.hidePopup       = this.hidePopup.bind(this);
    this.warnSubmitPopup = this.warnSubmitPopup.bind(this);
    this.submitForm      = this.submitForm.bind(this);
  }

  componentDidMount() {
    /* Set web page title on mount. */
    document.title = "Create Event: Review";
  }

  componentWillReceiveProps(nextProps) {
    /* Updates our component in response to form submission updates */
    console.log(nextProps, this.props);

  }

  prevPage() {
    this.props.history.goBack(-1);
  }

  submitForm() {
    let { dispatch, info } = this.props;
    dispatch(submitForm(info));
  }

  renderError() {
    // Renders an submission error
    let { form_error } = this.props;

    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        dismissButtonAriaLabel="Close"
      >
        <p style={error_style}>{form_error}</p>
      </MessageBar>
    );
  }

  renderSuccess() {
    // Renders a notification success bar
    let { form_success, info } = this.props;
    
    return (
      <MessageBar
        /*actions={
          <div>
            <MessageBarButton>Yes</MessageBarButton>
            <MessageBarButton>No</MessageBarButton>
          </div>
        }*/
        messageBarType={MessageBarType.success}
        isMultiline={false}
      >
        {form_success}{'! '}{info['event_name']}{' created!'}
        <Link href="/">Back to homepage.</Link>
      </MessageBar>
    );
  }

  hidePopup() {
    this.setState({ popupHidden: true });
  }

  warnSubmitPopup() {
    this.setState({
      popupHidden  : false,
      popupType    : 'submit',
      popupYesClick: this.submitForm
    });
  }

  render() {
    let { form_loading, form_success, form_error } = this.props;

    return (
      <FormStep>
        <FormTitle page={"Review & Submit"} />

        {form_error && this.renderError()}
        {form_success && this.renderSuccess()}

        <Popup
          popupHidden={this.state.popupHidden}
          popupType={this.state.popupType}
          btnClickYes={() => this.state.popupYesClick()}
          btnClickNo={() => this.hidePopup()}
        />

        <Details event={this.props.info} />

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.warnSubmitPopup}
          prevDisabled={false}
          nextDisabled={form_loading || form_success}
          nextText={"Submit for approval"}
        />
      </FormStep>
    );
  }
}

// Container
const mapStateToProps = state => ({
  info        : state.fields.info,
  errors      : state.fields.errors,
  form_loading: state.fields.form_loading,
  form_success: state.fields.form_success,
  form_error  : state.fields.form_error
});

export default connect(mapStateToProps)(StepFour);