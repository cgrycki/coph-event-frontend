import React from 'react';
import { NavLink } from 'react-router-dom';


export default class EventComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  render() {
    return (
      <div>
        <h2>Event: <span className="ms-font-xl">Details</span></h2>
        <NavLink
          to={'/form/user'}
          activeStyle={{ textDecoration: 'none', color: 'black' }}>
            Create an event
        </NavLink>
      </div>
    );
  }
}