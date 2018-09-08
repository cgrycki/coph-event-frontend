/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import { connect }    from 'react-redux';
import { push }       from 'connected-react-router';
import EventNav       from './EventNav';
import Details        from '../common/Details';
import {Viewer}       from '../Diagram';
import WorkflowWidget from './WorkflowWidget';
import Popup          from '../common/Popup';
import './EventPage.css';


/* Actions ------------------------------------------------------------------*/
import { 
  getEvent,
  deleteEvent 
}                               from '../../actions/event.actions';
import { populateFormAndPush }  from '../../actions/nav.actions';


/* React Component ----------------------------------------------------------*/
/**
 * Renders a page to see event details and to take actions related to event.
 * Component will fetch event data from server if the event infomation isn't 
 * loaded already and `package_id` does not match it's last passed `package_id`.
 */
class EventPage extends React.Component {
  state = {
    pivot        : "Form", // One of "Form", "Layout", "Workflow"
    popupHidden  : true,
    popupType    : 'edit',
    popupYesClick: () => console.log('clicked!')
  };


  /** Retrieves information from server about event */
  componentDidMount()   {
    const { 
      match: { params: { package_id }},
      should_fetch, getEventFromServer
    } = this.props;
    
    if (should_fetch) getEventFromServer(package_id);
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
    const { event, items, editEvent, deleteEventFromServer, navigate } = this.props;

    // Create a mapping of 'state' => function
    const clickCallback = {
      edit    : () => editEvent(event, items),
      delete  : () => deleteEventFromServer(event.package_id),
      deleting: () => console.log("Patience... I've sent the delete request to the server"),
      error   : () => navigate("/dashboard")
    };

    this.setState({
      popupHidden: false,
      popupType: popupType,
      popupYesClick: clickCallback[popupType]
    });
  }

  /** Sets our component display */
  pivotClick = (pivotKey) => {
    this.setState({ pivot: pivotKey.key.substring(2) });
  }


  render() {
    let { 
      history,  match: { params: { package_id }},
      permissions: { signatureId },                        
      permissions, event, items, event_loading
    } = this.props;

    let {pivot} = this.state;

    return (
      <div className="EventPage">
        <EventNav
          history={history}
          selectedPivot={this.state.pivot}
          onToggle={this.pivotClick}
          showLayout={items.length !== 0}
          permissions={permissions}
          onEdit={() => this.renderPopup('edit')}
          onRemove={() => this.renderPopup('delete')}
          package_id={package_id}
        />

        <br />

        {(pivot === "Form") && 
          <Details event={event} loading={event_loading} />}

        {(pivot === "Layout") && <Viewer/>}

        {(pivot === "Workflow") &&
          <WorkflowWidget package_id={package_id} signature_id={signatureId}/>}

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
  getEventFromServer   : package_id => dispatch(getEvent(package_id)),
  deleteEventFromServer: package_id => dispatch(deleteEvent(package_id)),
  editEvent            : (info, items) => dispatch(populateFormAndPush(info, items)),
  navigate             : path => dispatch(push(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);