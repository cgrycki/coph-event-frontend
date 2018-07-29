import React from 'react';

import FormTitle from './shared/FormTitle';
import FormButtons from './shared/FormButtons';


export default class Form extends React.PureComponent {
  render() {
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          {this.props.children}
        </div>
      </div>
    );
  }
}