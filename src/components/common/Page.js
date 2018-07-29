// Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

class Page extends React.PureComponent {
  render() {
    let { location } = this.props;

    // Create a boolean flag for conditionally setting styles
    const isLayout = location.pathname === "/form/layout";

    // Inline page styling
    // Original styling below
    // "ms-sm12 ms-lg10 ms-xxl8 ms-lgPush1 ms-xxlPush2";
    const page_width  = (isLayout) ? "90%"                : "66%";
    const page_height = (isLayout) ? "calc(100% - 60px)"  : "76%";
    const page_margin = (isLayout) ? "0% 5%"              : "6% 17%";
    const page_style  = {
      width           : page_width,
      height          : page_height,
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