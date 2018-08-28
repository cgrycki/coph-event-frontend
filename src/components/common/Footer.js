import React from 'react';
import { Link } from 'react-router-dom';


export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className="ms-textAlignCenter">
        <Link className="Footer" to="/about">About Us</Link>
      </div>
    );
  }
}