import React        from 'react';
import { connect }  from 'react-redux';
import DashboardNav from './DashboardNav';
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
    this.state = {is_admin: props.is_admin};
  }

  /** Fetches event list on load and alters web page title */
  componentDidMount() {
    document.title = "My Events @ CPHB";
    this.props.getEventsFromServer();
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm12 Dashboard">

        <DashboardNav 
          history={this.props.history}
          is_admin={this.props.is_admin}
        />
        
        <div><hr/><br/></div>

        <EventList
          is_admin={this.props.is_admin}
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
  logged_in     : state.app.logged_in,
  is_admin      : state.app.is_admin
});

const mapDispatchToProps = dispatch => ({
  getEventsFromServer  : () => dispatch(getEvents()),
  popuplateEventAndPush: (package_id) => dispatch(populateEventAndPush(package_id)),
  populateFormAndPush  : (info) => dispatch(populateFormAndPush(info)),
  deleteEventFromServer: (package_id) => dispatch(deleteEvent(package_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);