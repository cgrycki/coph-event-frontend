/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import { connect }    from 'react-redux';
import { push }       from 'connected-react-router';

import EventNav       from './EventNav';
import WorkflowWidget from './WorkflowWidget';
import Popup          from '../common/Popup';
import Details        from '../common/Details';

import './EventPage.css';


/* Actions ------------------------------------------------------------------*/
import { 
  getEvent,
  deleteEvent 
}                               from '../../actions/event.actions';
import { populateFormAndPush }  from '../../actions/field.actions';


/* React Component ----------------------------------------------------------*/
/**
 * Renders a page to see event details and to take actions related to event.
 * Component will fetch event data from server if the event infomation isn't 
 * loaded already and `package_id` does not match it's last passed `package_id`.
 */
class EventPage extends React.Component {
  constructor() {
    super();
    this.state     = { 
      popupHidden  : true,
      popupType    : 'edit',
      popupYesClick: () => console.log('clicked!')
    };

    // Bind popup functions
    this.hidePopup   = this.hidePopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

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
  hidePopup() { 
    this.setState({ popupHidden: true }); 
  }

  /** Sets our popup's state and callback */
  renderPopup(popupType) {
    // Gather dispatch functions from react-redux's connect
    const { event, editEvent, deleteEventFromServer, navigate } = this.props;

    // Create a mapping of 'state' => function
    const clickCallback = {
      edit    : () => editEvent(event),
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

  render() {
    let { 
      history,  match: { params: { package_id }},
      permissions: { signatureId },                        
      permissions, event, event_loading
    } = this.props;

    return (
      <div className="EventPage">
        <EventNav
          history={history}
          permissions={permissions}
          onEdit={() => this.renderPopup('edit')}
          onRemove={() => this.renderPopup('delete')}
          package_id={package_id}
        />


        <br/>
        {' '}
        <Details event={event} loading={event_loading} />

        <Popup
          popupHidden={this.state.popupHidden}
          popupType={this.state.popupType}
          btnClickYes={() => this.state.popupYesClick()}
          btnClickNo={() => this.hidePopup()}
        />

        {(signatureId !== null) && 
          <WorkflowWidget
            packageId={package_id}
            signatureId={signatureId}
          />}
      </div>
    );
  }
}


/* Redux Container ----------------------------------------------------------*/
const mapStateToProps = state => ({
  should_fetch : state.events.should_fetch,
  event        : state.events.event,
  permissions  : state.events.permissions,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error
});

const mapDispatchToProps = dispatch => ({
  getEventFromServer   : package_id => dispatch(getEvent(package_id)),
  deleteEventFromServer: package_id => dispatch(deleteEvent(package_id)),
  editEvent            : info => dispatch(populateFormAndPush(info)),
  navigate             : path => dispatch(push(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);