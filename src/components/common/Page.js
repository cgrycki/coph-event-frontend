// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavPage from './NavPage/';


class Page extends React.PureComponent {
  render() {
    let { history } = this.props;

    return (
      <div className="ms-Grid-col ms-sm12 ms-xl10 ms-xlPush1 ms-fadeIn10 fullHeight" >
        <div className="Page">
          <NavPage history={history} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(Page);