import React from 'react';
import { Toggle, ComboBox } from 'office-ui-fabric-react';
import { isNumeric, isLength } from 'validator';


/**
 * Renders the Course Search input row and dropdown
 */
export default class Course extends React.PureComponent {
  renderSearchPlaceholder() {
    return { key: 'dropdownPlaceholder', text: 'Start typing a course name' };
  }

  renderSearch() {
    // Renders the dropdown/search input to select a class
    const search_styles = { 
      "marginLeft": "auto",
      "width"     : "350px",
      "maxWidth"  : "350px"
    };

    return (
      <div style={search_styles}>
        <ComboBox
          label={'Course Name'}
          allowFreeform={true}
          autoComplete="off"
          defaultSelectedKey={this.renderSearchPlaceholder().key}
          options={[this.renderSearchPlaceholder()]}
          dropdownWidth={350}
        />
      </div>
    );
  }




  render() {
    // Styles the row 
    const setup_styles = {
      "padding"       : "0px 8px",
      "boxSizing"     : "border-box",
      "display"       : "flex",
      "justifyContent": "flex-start",
      "flexDirection" : "row"
    }

    return (
      <div className="ms-Grid-row" style={setup_styles}>
        <Toggle
          defaultChecked={false}
          label={"Event is for university course?"}
          onText="True"
          offText="False"
          onChanged={(evt) => this.props.onChange('references_course', evt)}
        />
        {this.props.references_course && this.renderSearch()}
      </div>
    );
  }
}