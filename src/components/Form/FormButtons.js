import React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';

// Flex row
const flex_styles = {
  "display"       : "flex",
  "flexDirection" : "row",
  "justifyContent": "space-between",
  "margin"        : "15px 0px 0px 0px"
};

export default class FormButtons extends React.PureComponent {
  render() {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 FormButtons">
          <div style={flex_styles}>
            <DefaultButton
              primary={false}
              onClick={() => this.props.prevPage()}
            >Back
            </DefaultButton>

            <DefaultButton
              primary={true}
              disabled={this.props.disabled}
              onClick={() => this.props.nextPage()}
            >Next
            </DefaultButton>
          </div>
        </div>
      </div>
    );
  }
}