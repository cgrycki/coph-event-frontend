// Dependencies
import React        from 'react';
import { NavLink }  from 'react-router-dom';
import { connect }  from 'react-redux';

import EventNav     from './EventNav';
import EventDetails from './EventDetails';


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
    const { match: { params: { package_id }}} = this.props;
    
    console.log(package_id);
  }

  render() {
    return (
      <div>
        <h2>Event: <span className="ms-font-xl">Details</span></h2>
        <h4>Package ID: <span className="ms-font-l">{this.props.match.params.package_id}</span></h4>
        <hr/>

        <NavLink
          to={'/form/user'}
          activeStyle={{ textDecoration: 'none', color: 'black' }}>
            Create an event
        </NavLink>
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(EventPageComponent);