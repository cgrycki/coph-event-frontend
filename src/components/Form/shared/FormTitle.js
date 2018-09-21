import React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react';

export default class FormTitle extends React.Component {
  render() {
    const { page, progress } = this.props;

    return (
      <div className="FormTitle">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <h2>{page}</h2>
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