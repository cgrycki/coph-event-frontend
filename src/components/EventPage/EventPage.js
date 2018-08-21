/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import { connect }    from 'react-redux';
import { push }       from 'connected-react-router';

import EventNav       from './EventNav';
import ActionButtons  from './ActionButtons';
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
    this.hidePopup       = this.hidePopup.bind(this);
    this.warnEditEvent   = this.warnEditEvent.bind(this);
    this.warnDeleteEvent = this.warnDeleteEvent.bind(this);
    this.loadDeleteEvent = this.loadDeleteEvent.bind(this);

    // Dispatch functions
    this.editEvent = this.editEvent.bind(this);
    this.deleteEventFromServer = this.deleteEventFromServer.bind(this);
  }

  /** Retrieves information from server about event */
  componentDidMount()   {
    const { match: { params: { package_id }}} = this.props;
    this.fetchEventFromServer(package_id);
  }

  /** Updates our web page title when event loads. */
  componentWillUpdate(nextProps, prevProps) {
    const { event: { event_name }, dispatch } = nextProps;
    if (event_name) document.title = `Event: ${event_name}`;

    // If the current state has been set to delete, and loading then we know the user 
    //initiated an event deletion. We should set the popup type to deleting to let them know
    if (this.state.popupType === "delete" && nextProps.event_loading)
      this.loadDeleteEvent();
    else if (this.state.popupType === "deleting" && !nextProps.event_loading) {
      if (!nextProps.event_error) dispatch(push("/dashboard"));
      else this.setState({ popupType: 'error' });
    };
  }

  /** Initiates a GET request to our server for an event */
  fetchEventFromServer(package_id) {
    const { dispatch } = this.props;
    dispatch(getEvent(package_id));
  }

  /* Alters component state, and hides the popup after a rerender. */
  hidePopup() { 
    this.setState({ popupHidden: true }); 
  }

  /** Sets our popup type to edit and flags the dialog to render. */
  warnEditEvent() {
    this.setState({
      popupHidden  : false,
      popupType    : 'edit',
      popupYesClick: this.editEvent
    });
  }

  /** Populates the form information fields with current event's data. */
  editEvent() {
    let { dispatch, event } = this.props;
    dispatch(populateFormAndPush(event));
  }

  /** Sets our popup type to delete and opens the dialog. */
  warnDeleteEvent() {
    this.setState({
      popupHidden  : false,
      popupType    : 'delete',
      popupYesClick: this.deleteEventFromServer
    })
  }

  /** Sets our popup type to loading */
  loadDeleteEvent() {
    this.setState({
      popupHidden: false,
      popupType: "deleting",
      popupYesClick: () => console.log("Patience... Submitted to server")
    });
  }

  /** Initiates deleteing of the current event from Workflow and Dynamodb. */
  deleteEventFromServer() {
    const { match: { params: { package_id }}, dispatch } = this.props;
    dispatch(deleteEvent(package_id));
  }

  render() {
    let { 
      history,  match: { params: { package_id, signature_id }},                            
      permissions, event,
    } = this.props;

    return (
      <div className="EventPage">
        <EventNav
          history={history}
          permissions={permissions}
          onEdit={this.warnEditEvent}
          onRemove={this.warnDeleteEvent}
          package_id={package_id}
        />

        {' '}
        <hr/>

        <Details event={event} />

        <Popup
          popupHidden={this.state.popupHidden}
          popupType={this.state.popupType}
          btnClickYes={() => this.state.popupYesClick()}
          btnClickNo={() => this.hidePopup()}
        />

        {signature_id && <WorkflowWidget signature_id={signature_id} />}
      </div>
    );
  }
}


/* Redux Container ----------------------------------------------------------*/
const mapStateToProps = state => ({
  event        : state.events.event,
  permissions  : state.events.permissions,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error
});

/*const mapDispatchToProps = dispatch => ({
  getEvent   : package_id => dispatch(getEvent(package_id)),
  deleteEvent: package_id => dispatch(deleteEvent(package_id)),
  editEvent  : info => dispatch(populateFieldInfo(info))
});*/

export default connect(mapStateToProps)(EventPage);