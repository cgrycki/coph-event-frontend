import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className="FooterWrapper">
        <div className="Footer">
          <NavLink to="/about">About</NavLink>
        </div>
      </div>
    );
  }
}