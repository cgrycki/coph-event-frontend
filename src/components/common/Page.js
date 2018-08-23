// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

class Page extends React.PureComponent {
  render() {
    let { location } = this.props;

    // Create a boolean flag for conditionally setting styles
    const isLayout = location.pathname === "/form/layout";

    // Inline page styling
    // Original styling: "ms-sm12 ms-lg10 ms-xxl8 ms-lgPush1 ms-xxlPush2";
    const page_width  = (isLayout) ? "98%"                : "inherit";
    const page_height = (isLayout) ? "calc(100% - 55px)"  : "inherit";
    const page_margin = (isLayout) ? "40px calc(2% / 2) 15px"   : "6% 12%";
    const page_style  = {
      //width : page_width,
      //height: '100%',
      display: 'flex',
      flexGrow: '1',
      flexDirection: 'column'
      //margin: page_margin
    };

    return (
      <div 
        className="ms-borderBase ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-lgPush1 ms-xl8 ms-xlPush2 ms-xxl6 ms-xxlPush3 ms-fadeIn10 Page"
        //style={page_style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Page);