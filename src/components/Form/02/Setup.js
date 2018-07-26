import React from 'react';
import { Toggle } from 'office-ui-fabric-react';
import { isNumeric, isLength } from 'validator';


/**
 * 
 */
class MFK extends React.PureComponent {
  /* Fields 
    FUND
    ORG
    DEPT
    SUB DEPT
    GRANT PROGRAM
    INST ACCT
    ORG ACCT 
    DEPT ACCT 
    FUNC COST CNTR
  */
  render() {
    return (<p>MFK</p>)
  }
}

export default class Setup extends React.PureComponent {
  render() {
    const setup_styles = {
      "paddingLeft": "8px",
      "paddingRight": "8px"
    }
    return (
      <div className="ms-Grid-row" style={setup_styles}>
        <Toggle
          defaultChecked={false}
          label={"Event furniture and setup required"}
          onText="True"
          offText="False"
          onChanged={(evt) => this.props.onChange('setup_required', evt)}
        />
        {this.props.setup_required && 
          <MFK
            onChanged={this.props.onChange}
            setup_mfk={this.props.setup_mfk}
          />
        }
      </div>
    );
  }
}