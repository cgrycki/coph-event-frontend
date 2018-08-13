// Dependencies
import React        from 'react';
import { connect }  from 'react-redux';

import EventNav     from './EventNav';
import EventDetails from './EventDetails';
import './EventPage.css';


// Actions
import { getEvent } from '../../actions/event.actions';


// Component
class EventPageComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
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
      match: { params: { package_id }},
      history,
      event
    } = this.props;

    return (
      <div className="ms-Grid-col ms-sm12 EventPage">
        <EventNav
          package_id={package_id}
          history={history}
        />

        <hr/>
        
        <EventDetails 
          event={event}
        />
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  event: state.events.event,
  event_loading: state.events.event_loading,
  event_error: state.events.event_error
});


export default connect(mapStateToProps)(EventPageComponent);