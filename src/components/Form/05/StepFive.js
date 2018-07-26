import React from 'react';
import { connect } from 'react-redux';

// actions

// Field Labels
import { field_labels, review_fields } from '../../../constants/fieldTypes';


// React Component
class StepFiveComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };

    this.renderField = this.renderField.bind(this);
  }

  renderField(field) {
    let field_label = field_labels[field];
    let field_value = this.props.info[field];

    // Coerce date field to string
    if (field === 'date' && field_value.toISOString !== undefined) {
      field_value = field_value.toISOString().slice(0, 10);
    }
    
    return (
      <li key={field}>
        <b>{field_label}&nbsp;:&nbsp;</b> {field_value}
      </li>
    );
  }

  render() {
    return (
      <div>
        <h3>Step Five: Review</h3>
        <ul>
          {review_fields.map(d => this.renderField(d))}
        </ul>
      </div>
    );
  }
}


// Redux Container
const mapStateToProps = state => ({
  info         : state.fields.info,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error
});
export default connect(mapStateToProps)(StepFiveComponent);