import React from 'react';
import { TextField, DatePicker } from 'office-ui-fabric-react';
import { nextWeek, datePickerStrings } from '../../utils';

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      error: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange(evt) {
    const name = this.props.name;
    const value = evt;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });
    this.props.onChange({ name, value, error });
  }

  renderText() {
    let commentText = this.props.name === 'eventComments';

    return (
      <TextField
        label={this.props.label}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={(evt) => this.onChange(evt)}

        /* Error messages and validation. */
        errorMessage={this.state.error}
        onGetErrorMessage={(evt) => this.onChange(evt)}
        validateOnLoad={false}
        validateOnFocusOut={true}

        /* Only the comments aren't required, which makes some 
          conditional logic convenient. */
        required={!commentText}
        multiline={commentText}
        rows={ commentText ? 4 : 1}
      />
    );
  }

  renderDate() {
    return (
      <DatePicker
        label={this.props.label}
        value={this.state.value}
        placeholder={this.props.placeholder}
        minDate={nextWeek()}
        isRequired={true}
        showGoToToday={false}
        strings={datePickerStrings}
        onSelectDate={(evt) => this.onChange(evt)}
      />
    );
  }

  renderTime() {
    return (
      <input
        name={this.props.name}
        type={'time'}
        min={'08:30'}
        max={'18:00'}
        required={true}
        onChange={(evt) => this.onChange(evt.target.value)}
      />
    );
  }

  render() {
    return (
      <div className='ms-normalize'>
        {{
          eventDate: this.renderDate(),
          eventTime: this.renderTime(),
          eventName: this.renderText(),
          eventComments: this.renderText(),
          userEmail: this.renderText()
        }[this.props.name]}
      </div>
    );
  }
}