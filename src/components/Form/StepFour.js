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
    this.submitForm      = this.submitForm.bind(this);
    this.hidePopup       = this.hidePopup.bind(this);
    this.submitWarnPopup = this.submitWarnPopup.bind(this);
    this.submitLoadPopup = this.submitLoadPopup.bind(this);
    this.submitDonePopup = this.submitDonePopup.bind(this);
    this.submitErrdPopup = this.submitErrdPopup.bind(this);
  }

  componentDidMount() {
    /* Set web page title on mount. */
    document.title = "Create Event: Review";
  }

  componentWillReceiveProps(nextProps) {
    /* Updates our component in response to form submission updates */

    // Check if there was a successful POST
    if (nextProps.form_success) this.submitDonePopup();

    // Check if we're loading
    else if (nextProps.form_loading) this.submitLoadPopup();

    // Check for errors
    else if (nextProps.form_error) this.submitErrdPopup();
  }

  prevPage() {
    this.props.history.goBack(-1);
  }

  submitForm() {
    let { dispatch, info } = this.props;
    dispatch(submitForm(info));
  }

  hidePopup() {
    this.setState({ popupHidden: true });
  }

  submitWarnPopup() {
    this.setState({
      popupHidden  : false,
      popupType    : 'submit',
      popupYesClick: this.submitForm
    });
  }

  submitLoadPopup() {
    this.setState({
      popupHidden  : false,
      popupType    : "submitted",
      popupYesClick: () => console.log("Patience... it's submitted.")
    });
  }

  submitDonePopup() {
    this.setState({
      popupHidden  : false,
      popupType    : "success",
      popupYesClick: this.hidePopup
    })
  }

  submitErrdPopup() {
    this.setState({
      popupHidden  : false,
      popupType    : "error",
      popupYesClick: this.submitForm
    });
  }

  render() {
    let { form_loading, form_success } = this.props;

    return (
      <FormStep>
        <FormTitle page={"Review & Submit"} />

        <Popup
          popupHidden={this.state.popupHidden}
          popupType={this.state.popupType}
          btnClickYes={() => this.state.popupYesClick()}
          btnClickNo={() => this.hidePopup()}
        />

        <Details event={this.props.info} />

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.submitWarnPopup}
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