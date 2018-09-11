import React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react';

export default class FormTitle extends React.Component {
  render() {
    let { page, progress } = this.props;

    return (
      <div className="FormTitle">
        <div className="ms-Grid-row" style={{ marginBottom: "25px" }}>
          <div className="ms-Grid-col ms-sm12">
            <h2 style={{ marginBottom: "5px"}}>{page}</h2>
            <ProgressIndicator 
              className="FormProgress"
              barHeight={4} 
              percentComplete={progress} 
            />
          </div>
        </div>
      </div>
    );
  }
}