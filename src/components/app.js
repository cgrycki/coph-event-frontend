import React from 'react';
import { Fabric } from 'office-ui-fabric-react';


export default class App extends React.Component {
  render() {
    return (
      <Fabric className="App ms-normalize">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              <h1>TESTING</h1>
            </div>
          </div>
        </div>
      </Fabric>
    );
  }
}