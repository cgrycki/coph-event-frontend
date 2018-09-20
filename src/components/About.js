import React from 'react';


export default class About extends React.PureComponent {
  render() {
    return (
      <div className="About">

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
            <h1>About</h1>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
            <h3>Links</h3>
            <ul>
              <li><a href="https://www.public-health.uiowa.edu/it/">Information Technology Home Page</a></li>
              <li>Like how we're doing? Hate it? Either way, please let us know and fill out our <a href="https://www.public-health.uiowa.edu/it-customer-satisfaction/" target="_blank" rel="noopener noreferrer">survey.</a></li>
            </ul>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
          </div>
        </div>
      </div>
    );
  }
}
