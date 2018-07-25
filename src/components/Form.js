// For React
import React from 'react';
import { Switch, Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import { Fabric } from 'office-ui-fabric-react';


import StepOne from './steps/one/StepOne';
import StepTwo from './steps/two/StepTwo';

// Dumb component
export default class Form extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Fabric className="Form ms-normalize">
        <div className="ms-Grid">

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              <h1><strong>FORM ROUTER</strong></h1>
            </div>
          </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6">
              <h2>TESTING</h2>
            </div>

            <div className="ms-Grid-col ms-sm6">
              <h2>TESTING</h2>
            </div>
          </div>

          <div className="ms-Grid-row">
            <Switch>
              <Redirect from="/" to="/form/basic" />
              <Route path="/form/basic" exact component={StepOne} />
              <Route path="/form/user" exact component={StepTwo} />
            </Switch>
            <StepOne/>
          </div>
        </div>
      </Fabric>
    );
  }
}