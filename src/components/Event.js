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
        <h3>Singular event page!</h3>
        <button>
          <NavLink
            to={'/'}
            activeStyle={{ textDecoration: 'none', color: 'black' }}>
              Create an event
          </NavLink>
        </button>
      </div>
    );
  }
}