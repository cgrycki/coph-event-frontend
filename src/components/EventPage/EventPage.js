// Dependencies
import React          from 'react';
import { connect }    from 'react-redux';

import EventNav       from './EventNav';
import EventDetails   from './EventDetails';
import WorkflowWidget from './WorkflowWidget';
import './EventPage.css';

// Actions
import { getEvent }   from '../../actions/event.actions';


// Component
class EventPageComponent extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    /* Fetches our event information on mount. */
    const { 
      match: { params: { package_id }},
      dispatch
    } = this.props;
    
    // Execute our call to get single event data
    dispatch(getEvent(package_id));
  }

  render() {
    const { 
      match: { params: { package_id, signature_id }},
      history,
      event
    } = this.props;

    return (
      <div className="ms-Grid-col ms-sm12 EventPage">
        <EventNav
          package_id={package_id}
          history={history}
        />

        <h2>Event Details</h2> 

        <div>
          <hr/>
          <br/>
        </div>
        
        <EventDetails event={event} />

        {signature_id &&
          <WorkflowWidget
            package_id={package_id}
            signature_id={signature_id}
          />}
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  event        : state.events.event,
  permissions  : state.events.permissions,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error
});


export default connect(mapStateToProps)(EventPageComponent);