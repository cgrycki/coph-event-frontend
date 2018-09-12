// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';
import Details        from '../common/Details';
import DetailsNav     from '../common/Details/DetailsNav';
import { Viewer }     from '../Diagram';
import Popup          from '../common/Popup';

// Actions
import { submitForm } from '../../actions/form.actions';


// Component
class StepFour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pivot: "Form",
      popupHidden  : true,
      popupType    : 'submit',
      popupYesClick: this.submitForm
    };

    this.submitForm  = this.submitForm.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  /** Set web page title on mount. */
  componentDidMount() {
    document.title = "Create Event: Review";
  }

  /** Updates our component in response to form submission updates */
  componentWillReceiveProps(nextProps) {
    // Check if there was a successful POST
    if (nextProps.form_success) this.renderPopup("success");

    // Check if we're loading
    else if (nextProps.form_loading) this.renderPopup("submitted");

    // Check for errors
    else if (nextProps.form_error) this.renderPopup("error");
  }

  /** Go back 1 page in our history stack */
  prevPage = () => {
    const { history } = this.props;
    history.goBack(-1);
  }

  submitForm() {
    let { dispatch, info, items } = this.props;
    dispatch(submitForm(info, items));
  }

  /** Hides popup by setting component state. */
  hidePopup = () => {
    this.setState({ popupHidden: true });
  }

  /** Shows and sets popup's text and confirmation callback. */
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

  setPivot = pivotKey => this.setState({ pivot: pivotKey.key.substring(2) });

  render() {
    const { form_loading, form_success, info: { package_id }, items } = this.props;
    const { pivot: selectedPivot } = this.state;

    // Conditionally set submit button text
    const submitBtnText = (package_id !== null) ? "Submit Revisions" : "Submit for Approval";

    // Conditionally show Layout pivot
    const showLayout = items.length > 0;

    return (
      <FormStep>
        <FormTitle page={"Review & Submit"} progress={1} />

        <div className="ms-Grid-row FormAlignStart">
          <DetailsNav
            selectedPivot={selectedPivot}
            onToggle={this.setPivot}
            showLayout={showLayout}
          />
          
          <div className="ms-Grid-col">
            {(selectedPivot === 'Form') && <Details event={this.props.info} />}
            {(selectedPivot === 'Layout') && <Viewer items={items}/>}
          </div>
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={() => this.renderPopup("submit")}
          prevDisabled={false}
          nextDisabled={form_loading || form_success}
          nextText={submitBtnText}
        />

        <Popup
          popupHidden={this.state.popupHidden}
          popupType={this.state.popupType}
          btnClickYes={() => this.state.popupYesClick()}
          btnClickNo={() => this.hidePopup()}
        />
      </FormStep>
    );
  }
}

// Container
const mapStateToProps = state => ({
  info        : state.form.fields,
  items       : state.diagram.items,
  form_loading: state.form.form_loading,
  form_success: state.form.form_success,
  form_error  : state.form.form_error
});


export default connect(mapStateToProps)(StepFour);