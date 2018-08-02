import React from 'react';
import { NavLink } from 'react-router-dom';


export default class EventComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  componentDidMount() {
    // Fetches our event information
    const { match: { params }} = this.props;
    
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