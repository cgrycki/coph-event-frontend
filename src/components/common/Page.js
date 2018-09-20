// Dependencies
import React          from 'react';
import { withRouter } from 'react-router-dom';
import NavPage        from './NavPage/';
import NavBar         from './NavBar';
import Footer         from './Footer';


class Page extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div className="ms-Grid fullHeight">
        <div className="ms-Grid-row fullHeight">
          <div className="ms-Grid-col ms-sm12 ms-lg10 ms-lgPush1 ms-xxl8 ms-xxlPush2 ms-fadeIn10 fullHeight" >
            <div className="Page">
              <NavBar />
              <NavPage history={history} />
              {this.props.children}
              <Footer/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Page);