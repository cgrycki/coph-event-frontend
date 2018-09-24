import React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

export default class FormTitle extends React.Component {
  render() {
    const { progress } = this.props;

    return (
      <div className="FormFieldRow">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <ProgressIndicator 
              className="FormProgress"
              barHeight={5} 
              percentComplete={progress} 
            />
          </div>
        </div>
      </div>
    );
  }
}