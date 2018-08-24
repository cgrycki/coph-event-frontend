import React from 'react';
import { 
  Toggle, 
  BasePicker,
  TagPicker,
  Icon
} from 'office-ui-fabric-react';
import * as rp from 'request-promise';
import { fetchCourses } from '../../../actions/room.actions';


const courseStyle = {
  margin: '10px'
};


/**
 * Renders the Course Search input row and dropdown
 */
export default class Course extends React.Component {
  constructor() {
    super();
    this.state = { 
      query: '', 
      selectedCourse: [],
      courses: []
    };
    
    this.restCall           = this.restCall.bind(this);
    this.resolveSuggestions = this.resolveSuggestions.bind(this);
    this.onInputChange      = this.onInputChange.bind(this);
    this.itemSelected       = this.itemSelected.bind(this);
  }

  /** Return text for selected item in picker */
  getTextFromItem = (item) => item.title;

  /** Conducts a REST call  */
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
    console.log('render selection fired!', item);

    /*return (
      <div key="selectedCourse">
        &nbsp;&nbsp;
        <span>
          <Icon iconName="Education" style={{ fontSize: '16px'}}/>
        </span>
        &nbsp;{item.item.text}
      </div>
    );*/
    return item.item.text;
  }

  /** Input callback -- fetches courses if we have none. Otherwise filters suggestions */
  resolveSuggestions(e) {
    return (e && e.length >= 3) ? this.restCall(e.toLowerCase()) : null;
  }

  onInputChange(e) {
    console.log(e, this.props);
  }

  itemSelected(item) {
    this.setState({ selectedCourse: [item] });
  }

  render() {
    const { references_course, onChange, courses } = this.props;
    
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
          <TagPicker
            disabled={references_course}

            itemLimit={1}
            items={this.state.courses}
            
            getTextFromItem={item => item.text}
            onRenderSuggestionsItem={this.renderSuggestion}
            onRenderItem={this.renderSelection}

            resolveDelay={200}
            onResolveSuggestions={this.resolveSuggestions}
            
            //onInputChange=when the input string changes
            onFocus={this.onInputChange}
            //onChange = when selection items change
            
            selectedItems={this.state.selectedCourse}
            onItemSelected={this.itemSelected}

            pickerSuggestionsProps={{
              suggestionsHeaderText: 'Suggested Courses',
              noResultsFoundText   : 'No Courses Found',
              loadingText          : 'Fetching Courses from MAUI...',
              searchingText        : 'Searching for Courses from MAUI.',
              resultsMaximumNumber : 20,
              showRemoveButtons     : true,

            }}
            inputProps={{ placeholder: "Start typing a course name", icon: 'Education' }}
          />
        </div>
      </div>
    );
  }
}