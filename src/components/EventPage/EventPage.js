/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import { connect }    from 'react-redux';
import { push }       from 'connected-react-router';
import EventNav       from './EventNav';
import Details        from '../common/Details';
import { Viewer }     from '../Diagram';
import WorkflowWidget from './WorkflowWidget';
import Popup          from '../common/Popup';
import './EventPage.css';


/* Actions ------------------------------------------------------------------*/
import { 
  getEvent,
  deleteEvent 
} from '../../actions/event.actions';
import {
  populateFormAndPush,
  populateDiagramAndPush,
  applyDiagramLayoutAndPush
}  from '../../actions/nav.actions';


/* React Component ----------------------------------------------------------*/
/**
 * Renders a page to see event details and to take actions related to event.
 * Component will fetch event data from server if the event infomation isn't 
 * loaded already and `package_id` does not match it's last passed `package_id`.
 */
class EventPage extends React.Component {
  state = {
    pivot        : "Form", // One of {"Form", "Layout", "Workflow"}
    popupHidden  : true,
    popupType    : 'edit', // One of {"edit", "editLayout", "applyLayout", "delete"}
    popupYesClick: () => console.log('clicked!')
  };

  /** Retrieves information from server about event */
  componentDidMount()   {
    const { 
      match: { params: { package_id }},
      should_fetch, event_loading, getEventFromServer
    } = this.props;
    
    if (should_fetch && !event_loading) getEventFromServer(package_id);
  }

  /** Updates our web page title when event loads. */
  componentWillUpdate(nextProps, prevProps) {
    const { event: { event_name }, event_loading, event_error } = nextProps;
    const { popupType } = this.state;

    // Change page title
    if (event_name) document.title = `Event: ${event_name}`;

    // Check for updates in event status to trigger popup changes
    // If we've set the popup to delete but there's a 
    if (event_loading && popupType === "delete") this.renderPopup("deleting");
    else if (popupType === "deleting" && !event_loading) {
      // Check for errors, if none than the event was successfully deleted
      if (!event_error) this.props.navigate("/dashboard");
      else this.renderPopup("error");
    };
  }

  /** Alters component state, and hides the popup after a rerender. */
  hidePopup = () => { 
    this.setState({ popupHidden: true }); 
  }

  /** Sets our popup's state and callback */
  renderPopup = popupType => {
    // Gather dispatch functions from react-redux's connect
    const {
      event, layout,
      populateFormAndPush, populateDiagramAndPush, deleteEventFromServer, applyDiagramLayoutAndPush, navigate
    } = this.props;

    // Create a mapping of 'state' => function
    const clickCallback = {
      edit       : () => populateFormAndPush(event, layout),
      editLayout : () => populateDiagramAndPush(event, layout),
      applyLayout: () => applyDiagramLayoutAndPush(layout),
      delete     : () => deleteEventFromServer(event.package_id),
      deleting   : () => console.log("Patience... I've sent the delete request to the server"),
      error      : () => navigate("/dashboard")
    };

    this.setState({
      popupHidden: false,
      popupType: popupType,
      popupYesClick: clickCallback[popupType]
    });
  }

  /** Sets our component display by toggling which pivot item is selected. */
  pivotClick = pivotKey => {
    this.setState({ pivot: pivotKey.key.substring(2) });
  }

  render() {
    const { 
      history,  match: { params: { package_id }},
      permissions: { signatureId }, permissions,
      layout: { items },
      event, event_loading
    } = this.props;

    const { pivot } = this.state;

    // Change the edit callback depending if we're on the Form or Layout
    const editCallback = (pivot === 'Layout') ? 'editLayout' : 'edit';

    return (
      <div className="EventPage">
        <EventNav
          history={history}
          selectedPivot={this.state.pivot}
          onToggle={this.pivotClick}
          showLayout={items.length !== 0}
          permissions={permissions}
          onEdit={() => this.renderPopup(editCallback)}
          onApply={() => this.renderPopup('applyLayout')}
          onRemove={() => this.renderPopup('delete')}
          package_id={package_id}
        />

        <div className="ms-Grid-col">
          {(pivot === "Form") && 
            <Details event={event} loading={event_loading} />}

          {(pivot === "Layout") && <Viewer items={items} />}

          {(pivot === "Workflow") &&
            <WorkflowWidget package_id={package_id} signature_id={signatureId}/>}
        </div>

        <Popup
          popupHidden={this.state.popupHidden}
          popupType={this.state.popupType}
          btnClickYes={() => this.state.popupYesClick()}
          btnClickNo={() => this.hidePopup()}
        />
      </div>
    );
  }
}


/** Redux Container ----------------------------------------------------------*/
const mapStateToProps = state => ({
  ...state.events.current,
  should_fetch : state.events.should_fetch,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error
});

const mapDispatchToProps = dispatch => ({
  getEventFromServer       : (package_id)    => dispatch(getEvent(package_id)),
  deleteEventFromServer    : (package_id)    => dispatch(deleteEvent(package_id)),
  populateFormAndPush      : (info, layout)  => dispatch(populateFormAndPush(info, layout)),
  populateDiagramAndPush   : (info, layout)  => dispatch(populateDiagramAndPush(info, layout)),
  applyDiagramLayoutAndPush: layout          => dispatch(applyDiagramLayoutAndPush(layout)),
  navigate                 : (path)          => dispatch(push(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);