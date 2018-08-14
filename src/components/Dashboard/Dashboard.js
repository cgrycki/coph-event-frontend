import React from 'react';
import { connect } from 'react-redux';
import EventList from './EventList';

// Actions
import { getEvents } from '../../actions/event.actions';


// Component
class DashboardComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      events: props.events
    };
  }

  componentDidMount() {
    /* Fetches event list on load. */
    let { dispatch } = this.props;
    dispatch(getEvents());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      events       : nextProps.events,
      event_loading: nextProps.event_loading,
      event_error  : nextProps.event_error
    });
  }

  //renderLoad() {}
  //renderError() {}

  render() {
    let { 
      events, event_loading, event_error,
      history
    } = this.props;

    return (
      <div className="ms-Grid-col ms-sm12">
        <h3>Admin Page</h3>
        <EventList 
          events={events}
          history={history}
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

export default connect(mapStateToProps)(DashboardComponent);