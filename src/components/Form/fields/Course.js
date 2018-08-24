import React            from 'react';
import { error_style }  from '../../../constants/styles';
import * as rp          from 'request-promise';
import { 
  Toggle, 
  BasePicker,
  Icon,
  Label
}                       from 'office-ui-fabric-react';
const courseStyle = { margin: '10px' };


/**
 * Renders the Course Search input row and dropdown
 */
export default class Course extends React.Component {
  constructor() {
    super();
    this.state = { 
      query         : ''
    };
    
    this.resolveSuggestions = this.resolveSuggestions.bind(this);
    this.restCall           = this.restCall.bind(this);
    this.itemSelected       = this.itemSelected.bind(this);
    this.renderSelection    = this.renderSelection.bind(this);
    this.clearSelected      = this.clearSelected.bind(this);
  }

  /** Returns a REST call to fetch courses from MAUI as a Promise */
  restCall(courseText) {
    const uri = `${process.env.REACT_APP_REDIRECT_URI}/maui/courses/${courseText}`;
    const options = {
      method: 'GET',
      uri: uri,
      json: true,
      withCredentials: true
    };

    return rp(options)
      .then(res => res.map(c => ({key: c.courseId, text: c.title})))
      .then(res => res)
      .catch(err => []);
  }

  /** Return a suggested item from list as a DOM node. */
  renderSuggestion(item) {
    return (
      <div key={item.key} className="Course--suggestion" style={courseStyle}>
        <div className="ms-fontSize-l ms-fontWeight-semilight ms-textAlignLeft">
          {item.text}
        </div>
      </div>
    );
  }

  /** Returns the selected item as a DOM node. */
  renderSelection(item) {
    const selStyle = {
      background: "#d0d0d0",
      margin    : "2px",
      height    : "26px",
      lineHeight: "26px"
    }
    const selIconStyle = { 
      fontSize: "16px",
      margin  : "0 8px",
      lineHeight: "26px"
    }
    const selTextStyle = {
      overflow    : "hidden",
      textOverflow: "ellipsis",
      whiteSpace  : "nowrap",
      margin      : "0 8px",
      verticalAlign: "baseline"
    }
    const selCloseStyle = {
      cursor   : "pointer",
      color    : "#666666",
      fontSize : "12px",
      display  : "inline-block",
      textAlign: "center",
      width    : "30px"
    }

    return (
      <div key="selectedCourse" style={selStyle}>
        <span style={selIconStyle}><Icon iconName="Education" /></span>
        <span style={selTextStyle}>{item.item.text}</span>
        <span style={selCloseStyle}>
          <Icon 
            iconName="Cancel"
            onClick={() => this.clearSelected()}
          />
        </span>
      </div>
    );
  }

  /** Input callback -- fetches courses if we have none. Otherwise filters suggestions */
  resolveSuggestions(e) {
    return (e && e.length >= 2) ? this.restCall(e.toLowerCase()) : null;
  }

  /** Sets our component's selected course to item. */
  itemSelected(item) {
    this.props.onChange('referenced_course', item.text);
  }

  /** Clears the course selection from component and store */
  clearSelected() {
    this.props.onChange('referenced_course', '');
  }

  render() {
    const { 
      references_course, 
      referenced_course,
      error,
      onChange 
    } = this.props;

    // If we have a course text then create a list
    const selectedCourse = (referenced_course !== '') ? 
      [{ key: "selected", text: referenced_course }] : [];
    
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg4 ms-xl4 ms-xxl4">
          <Toggle
            defaultChecked={false}
            label={"Is this for an university course?"}
            onText="Yes"
            offText="No"
            onChanged={() => onChange('references_course', !references_course)}
          />
        </div>

        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg8 ms-xl7 ms-xlPush1 ms-slideRightIn20 ms-slideLeftOut20">
          <Label 
            disabled={!references_course} 
            required={references_course}>
            Course Name
          </Label>
          <BasePicker
            disabled={!references_course}

            itemLimit={1}
            items={this.state.courses}
            
            getTextFromItem={item => item.text}
            onRenderSuggestionsItem={this.renderSuggestion}
            onRenderItem={this.renderSelection}

            resolveDelay={200}
            onResolveSuggestions={this.resolveSuggestions}
                        
            selectedItems={selectedCourse}
            onItemSelected={this.itemSelected}

            pickerSuggestionsProps={{
              suggestionsHeaderText: 'Suggested Courses',
              noResultsFoundText   : 'No Courses Found',
              loadingText          : 'Fetching Courses from MAUI...',
              searchingText        : 'Searching for Courses from MAUI.',
              resultsMaximumNumber : 20,
              showRemoveButtons    : true
            }}
            inputProps={{ placeholder: "Start typing to search for a course" }}
          />
          {/* Add in an error message */}
          <span style={error_style}>{error}</span>
        </div>
      </div>
    );
  }
}