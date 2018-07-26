import React from 'react';
import { TextField } from 'office-ui-fabric-react';

/**
 * Renders a text field for form inputs.
 */
export default class TextInput extends React.PureComponent {
  render() {
    let { 
      label, placeholder, value, onChange,
      field, error,
      required, multiline, rows
    } = this.props;

    return (
      <TextField
        // Info and behavior
        label={this.props.label}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(evt) => this.props.onChange(evt)}

        /* Error messages and validation. */
        errorMessage={this.props.error}
        onGetErrorMessage={(evt) => this.props.onChange(field, evt)}
        validateOnLoad={false}
        validateOnFocusOut={true}

        /* Default field behavior */
        required={(required !== undefined) ? required : true}
        multiline={(multiline !== undefined) ? multiline : false}
        rows={(rows !== undefined) ? rows : 1}
      />
    );
  }
}