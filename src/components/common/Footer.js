import React from 'react';
import { Link } from 'react-router-dom';


export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className="FooterWrapper">
        <div className="Footer">
          <Link to="/about">About Us</Link>
        </div>
      </div>
    );
  }
}