import React from 'react';
import { NavLink } from 'react-router-dom';


export default class EventComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  render() {
    console.log(this.props, this.state);
    return (
      <div>
       <p>Singular event page!</p>
       <NavLink
        to={'/'}
        activeStyle={{
          textDecoration: 'none',
          color: 'black'
        }}
        >Create an event</NavLink>
      </div>
    );
  }
}