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
    const page_width  = (isLayout) ? "98%"                : "76%";
    const page_height = (isLayout) ? "calc(100% - 55px)"  : "76%";
    const page_margin = (isLayout) ? "40px calc(2% / 2) 15px"   : "6% 12%";
    const page_style  = {
      width           : page_width,
      minHeight       : page_height,
      margin          : page_margin,
      display         : "flex",
      "justifyContent": "center",
      "alignSelf"     : "center",
      "alignItems"    : "center"
    };

    return (
      <div 
        className={"Page ms-borderBase ms-Grid-col ms-fadeIn10"}
        style={page_style}>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Page);