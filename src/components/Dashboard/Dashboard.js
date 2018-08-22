import React        from 'react';
import { connect }  from 'react-redux';
import NavPage      from '../common/NavPage';
import Popup        from '../common/Popup';
import EventList    from './EventList';
import './Dashboard.css';


// Actions
import { 
  getEvents,
  deleteEvent,
  populateEventAndPush
}                              from '../../actions/event.actions';
import { populateFormAndPush } from '../../actions/field.actions';


// Component
class DashboardComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isAdmin      : props.isAdmin,
      popupHidden  : true,
      popupType    : 'edit',
      popupYesClick: () => console.log('clicked!')
    };

    this.hidePopup   = this.hidePopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  /** Fetches event list on load and alters web page title */
  componentDidMount() {
    document.title = "My Events @ CPHB";
    this.props.getEventsFromServer();
  }

  componentWillUpdate(nextProps, prevProps) {
    const { event_loading, event_error } = nextProps;
    const { popupType } = this.state;

    // If event deletion request was initiated
    if (event_loading && popupType === "delete") this.renderPopup('deleting');
    else if (popupType === "deleting" && !event_loading) {
      // Check for errors, if none than the event was successfully deleted
      if (event_error) this.renderPopup("error");
      else this.hidePopup();
    };
  }

  hidePopup() {
    this.setState({ popupHidden: true });
  }

  renderPopup(popupType) {
    const clickCallback = {
      'edit'    : () => this.props.populateFormAndPush,
      'delete'  : () => this.props.deleteEventFromServer,
      'deleting': () => console.log("Patience... I've sent the request to delete."),
      'approve' : () => console.log('clicked approve')
    };

    this.setState({
      popupHidden  : false,
      popupType    : popupType,
      popupYesClick: clickCallback[popupType]
    });
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm12 Dashboard">

        <div className="ms-Grid-row DashboardHeader">
          <NavPage history={this.props.history} />
          <h2>My Events</h2>
        </div>
        
        <div><hr/><br/></div>

        <Popup
          popupType={this.state.popupType}
          popupHidden={this.state.popupHidden}
          popupYesClick={this.state.popupYesClick}
        />

        <EventList
          items={this.props.events}
          loading={this.props.events_loading}
          onView={this.props.popuplateEventAndPush}
          onEdit={() => this.renderPopup('edit')}
          onDelete={() => this.renderPopup('delete')}
        /> 
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  events       : state.events.events,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error,
  loggedIn     : state.app.loggedIn,
  isAdmin      : state.app.isAdmin
});

const mapDispatchToProps = dispatch => ({
  getEventsFromServer  : () => dispatch(getEvents()),
  popuplateEventAndPush: (package_id) => dispatch(populateEventAndPush(package_id)),
  populateFormAndPush  : (info) => dispatch(populateFormAndPush(info)),
  deleteEventFromServer: (package_id) => dispatch(deleteEvent(package_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);