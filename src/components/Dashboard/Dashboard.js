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
  popuplateEventAndPush
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

  hidePopup() {
    this.setState({ popupHidden: true });
  }

  renderPopup(popupType) {
    const clickCallback = {
      'view'   : this.props.popuplateEventAndPush,
      'edit'   : this.props.populateFormAndPush,
      'delete' : this.props.deleteEventFromServer,
      'approve': () => console.log('clicked approve')
    };

    this.setState({
      popupHidden  : false,
      popupType    : popupType,
      popupYesClick: clickCallback[popupType]
    });
  }

  render() {
    const { events, history } = this.props;
    return (
      <div className="ms-Grid-col ms-sm12 Dashboard">

        <div className="ms-Grid-row DashboardHeader">
          <NavPage history={history} />
          <h2>My Events</h2>
        </div>
        
        <div><hr/><br/></div>
       
        <EventList
          events={events}
          onView={this.props.popuplateEventAndPush}
          onEdit={this.props.populateFormAndPush}
          onDelete={this.props.deleteEventFromServer}
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
  popuplateEventAndPush: (package_id) => dispatch(populateFormAndPush(package_id)),
  populateFormAndPush  : (info) => dispatch(populateFormAndPush(info)),
  deleteEventFromServer: (package_id) => dispatch(deleteEvent(package_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);