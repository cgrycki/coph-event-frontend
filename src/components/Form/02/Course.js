import React from 'react';
import { Toggle } from 'office-ui-fabric-react';
import { isNumeric, isLength } from 'validator';


/**
 * 
 */
class CourseSearch extends React.PureComponent {
  /* 
    Fields 
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
    return (<p>Course Search</p>)
  }
}

export default class Course extends React.PureComponent {
  render() {
    const setup_styles = {
      "paddingLeft": "8px",
      "paddingRight": "8px"
    }
    return (
      <div className="ms-Grid-row" style={setup_styles}>
        <Toggle
          defaultChecked={false}
          label={"Event for university course?"}
          onText="True"
          offText="False"
          onChanged={(evt) => this.props.onChange('references_course', evt)}
        />
        {this.props.references_course && 
          <CourseSearch
            onChanged={this.props.onChange}
            setup_mfk={this.props.setup_mfk}
          />
        }
      </div>
    );
  }
}