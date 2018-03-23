import React from 'react';
import { TextField, DatePicker } from 'office-ui-fabric-react';

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
        errorMessage={this.state.error}
        onChanged={(evt) => this.onChange(evt)}
        
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
        errorMessage={this.state.error}
        isRequired={true}
        onSelectDate={(evt) => this.onChange(evt)}
      />
    );
  }

  render() {
    return (
      <div className="">
        {this.props.name === 'eventDate' ?
          this.renderDate() :
          this.renderText()
        }
      </div>
    );
  }
}