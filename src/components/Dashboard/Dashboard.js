import React        from 'react';
import { connect }  from 'react-redux';
import NavPage      from '../common/NavPage';
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
    this.state = {isAdmin: props.isAdmin};
  }

  /** Fetches event list on load and alters web page title */
  componentDidMount() {
    document.title = "My Events @ CPHB";
    this.props.getEventsFromServer();
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm12 Dashboard">

        <div className="ms-Grid-row DashboardHeader">
          <NavPage history={this.props.history} />
          <h2>My Events</h2>
        </div>
        
        <div><hr/><br/></div>

        <EventList
          isAdmin={this.props.isAdmin}
          items={this.props.events}
          loading={this.props.event_loading}
          error={this.props.event_error}
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
  popuplateEventAndPush: (package_id) => dispatch(populateEventAndPush(package_id)),
  populateFormAndPush  : (info) => dispatch(populateFormAndPush(info)),
  deleteEventFromServer: (package_id) => dispatch(deleteEvent(package_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);