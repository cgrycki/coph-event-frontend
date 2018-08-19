/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import { connect }    from 'react-redux';

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
}                             from '../../actions/event.actions';
import { populateFieldInfo }  from '../../actions/field.actions';


/* React Component ----------------------------------------------------------*/
/**
 * Renders a page to see event details and to take actions related to event.
 * Component will fetch event data from server if the event infomation isn't 
 * loaded already and `package_id` does not match it's last passed `package_id`.
 */
class EventPage extends React.Component {
  constructor() {
    super();

    this.state     = { popupHidden: true };

    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.editEvent = this.editEvent.bind(this);
  }

  /** Retrieves information from server about event */
  componentDidMount()   {
    const { dispatch } = this.props;
  }

  /** Updates our web page title when event loads. */
  componentWillUpdate(nextProps) {
    const { event: { event_name }} = nextProps;
    if (event_name) document.title = `Event: ${event_name}`;
  }

  /* Alters component state, and shows a modal popup after a rerender. */
  showPopup() { this.setState({ popupHidden: false}); }

  /* Alters component state, and hides the popup after a rerender. */
  hidePopup() { this.setState({ popupHidden: true }); }

  /** Populates the form information fields with current event's data. */
  editEvent() {
    let { dispatch, event } = this.props;
    dispatch(populateFieldInfo(event));
  }

  /** Initiates deleteing of the current event from Workflow and Dynamodb. */
  deleteEvent() {
    const { 
      match: { params: { package_id }},
      dispatch
    } = this.props;
    dispatch(deleteEvent(package_id));
  }

  render() {
    let { 
      dispatch, history,                             // Application functions
      permissions, event,                            // Event information
      match: { params: { package_id, signature_id }} // Workflow information
    } = this.props;

    return (
      <div className="EventPage">
        <EventNav
          history={history}
          permissions={permissions}
          onEdit={this.editEvent}
          onRemove={this.showPopup}
          package_id={package_id}
        />

        {' '}
        <hr/>

        <Details event={event} />

        <Popup
          popupHidden={this.state.popupHidden}
          title={"Delete Event"}
          subText={"Are you sure you want to remove the event from Workflow? This can not be undone."}
          btnTextYes={"Yes, delete the event"}
          btnClickYes={() => this.showPopup()}
          btnTextNo={"Cancel"}
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

const mapDispatchToProps = dispatch => ({
  getEvent   : package_id => dispatch(getEvent(package_id)),
  deleteEvent: package_id => dispatch(deleteEvent(package_id)),
  editEvent  : info => dispatch(populateFieldInfo(info))
});

export default connect(mapStateToProps)(EventPage);