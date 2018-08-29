import React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react';

export default class FormTitle extends React.PureComponent {
  renderPage(page) {
    // Conditionally renders the sub page for our form title
    // aka: Create an Event(: <i>{page}</i>)
    return (
      <span>
        : <span className="ms-font-xl">{page}</span>
      </span>
    );
  }

  render() {
    let { page, progress } = this.props;

    return (
      <div className="FormTitle">
        <div className="ms-Grid-row" style={{ marginBottom: "25px" }}>
          <div className="ms-Grid-col ms-sm12">
            <h2 style={{ marginBottom: "5px"}}>
              Create an Event{(page !== undefined) && this.renderPage(page)}
            </h2>
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