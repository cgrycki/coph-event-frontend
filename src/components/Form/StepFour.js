// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';
import Details        from '../common/Details';
import Popup          from '../common/Popup';

// Actions
import { 
  submitForm,
  patchForm
} from '../../actions/field.actions';


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
    this.submitForm      = this.submitForm.bind(this);
    this.hidePopup       = this.hidePopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  componentDidMount() {
    /* Set web page title on mount. */
    document.title = "Create Event: Review";
  }

  componentWillReceiveProps(nextProps) {
    /* Updates our component in response to form submission updates */
    // Check if there was a successful POST
    if (nextProps.form_success) this.renderPopup("success");
    // Check if we're loading
    else if (nextProps.form_loading) this.renderPopup("submitted");
    // Check for errors
    else if (nextProps.form_error) this.renderPopup("error");
  }

  prevPage() {
    this.props.history.goBack(-1);
  }

  submitForm() {
    let { dispatch, info } = this.props;
    // Does this form have a packageID? if it does, it needs to be 
    // updated instead of created
    if (info.package_id === null) dispatch(submitForm(info));
    else dispatch(patchForm(info));
  }

  hidePopup() {
    this.setState({ popupHidden: true });
  }

  renderPopup(popupType) {
    // Really the only unique part of the popup is it's confirmation action
    const onConfirm = {
      submit   : this.submitForm,
      submitted: () => console.log("Patience... it's been submitted."),
      success  : this.hidePopup,
      error    : this.hidePopup
    };

    // Set component to render the popup type w/ call back.
    this.setState({
      popupHidden  : false,
      popupType    : popupType,
      popupYesClick: onConfirm[popupType]
    });
  }

  render() {
    let { form_loading, form_success, info: { package_id }} = this.props;

    // Conditionally set submit button text
    const submitBtnText = (package_id !== null) ? "Submit Revisions" : "Submit for Approval";

    return (
      <FormStep>
        <FormTitle page={"Review & Submit"} progress={1} />

        <Popup
          popupHidden={this.state.popupHidden}
          popupType={this.state.popupType}
          btnClickYes={() => this.state.popupYesClick()}
          btnClickNo={() => this.hidePopup()}
        />

        <Details event={this.props.info} />

        <FormButtons
          prevPage={this.prevPage}
          nextPage={() => this.renderPopup("submit")}
          prevDisabled={false}
          nextDisabled={form_loading || form_success}
          nextText={submitBtnText}
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