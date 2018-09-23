// Dependecies
import React            from 'react';
import { connect }      from 'react-redux';
// Actions
import { submitForm }   from '../../actions';
import scaleToFloorplan from '../../utils/scaleToFloorplan';
// Form components + fields
import {
  FormStep,
  FormTitle,
  FormButtons
}                     from './shared';
import Details from '../common/Details';
import DetailsNav from '../common/Details/DetailsNav';
import Diagram from '../Diagram';
import Popup  from '../common/Popup';


class Step extends React.Component {
  state = {
    pivot        : 'Form',
    popupHidden  : true,
    popupType    : 'submit',
    popupYesClick: this.submitForm
  }

  /** Sets web page title on mount */
  componentDidMount() {
    document.title = "Create an Event: Review";
  }

  /** Updates our component in response to form submission updates */
  componentWillReceiveProps(nextProps) {
    // Check if there was a successful POST
    if (nextProps.form_success)       this.showPopup("success");
    // Check if we're loading
    else if (nextProps.form_loading)  this.showPopup("submitted");
    // Check for errors
    else if (nextProps.form_error)    this.showPopup("error");
  }

  
  prevPage = () => this.props.history.goBack(-1);
  nextPage = () => this.showPopup('submit');

  /** Changes displayed pivot by setting component state */
  setPivot = pivotKey => this.setState({ pivot: pivotKey.key.substring(2) });

  /** Hides popup by setting component state. */
  hidePopup = () => this.setState({ popupHidden: true });

  /** Shows and sets popup's text and confirmation callback. */
  showPopup = popupType => {
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

  /** Scales items to floorplan dimensions before initiating a POST to our API */
  submitForm = () => {
    const { info, items, dimensions, chairs_per_table, submitForm } = this.props;

    // Scale items to native floorplan resolution
    const scaledItems = scaleToFloorplan(items, dimensions);

    // Initate a POST
    submitForm(info, scaledItems, chairs_per_table);
  }

  render() {
    const { form_loading, form_success, info: { package_id }, items } = this.props;
    const { pivot: selectedPivot } = this.state;

    // Conditionally set submit button text
    const submitBtnText = (package_id !== null) ? "Submit Revisions" : "Submit for Approval";

    // Conditionally show Layout pivot
    const showLayout = items.length > 0;

    return (
      <FormStep>
        <FormTitle progress={1} />

        <div className="ms-Grid-row FormAlignStart">
          <DetailsNav
            selectedPivot={selectedPivot}
            onToggle={this.setPivot}
            showLayout={showLayout}
          />
          
          <div className="ms-Grid-col">
            {(selectedPivot === 'Form') && <Details event={this.props.info} />}
            {(selectedPivot === 'Layout') && <Diagram draggable={false} />}
          </div>
        </div>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
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

const mapStateToProps = state => ({
  info            : state.form.fields,
  items           : state.diagram.items,
  chairs_per_table: state.diagram.layout.chairs_per_table,
  dimensions      : {
    width : state.diagram.layout.width,
    height: state.diagram.layout.height
  },
  form_loading: state.form.form_loading,
  form_error  : state.form.form_error,
  form_success: state.form.form_success
})

const mapDispatchToProps = dispatch => ({
  submitForm: (info, items, chairs_per_table) => dispatch(submitForm(info, items, chairs_per_table))
})

export default connect(mapStateToProps, mapDispatchToProps)(Step);