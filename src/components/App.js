import React from 'react';
import { Provider } from 'react-redux'
import { Switch, Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import { Fabric } from 'office-ui-fabric-react';


// Site components
import Navbar from './common/NavBar';
import Form  from './Form';
import Event from './Event';
import Admin from './Admin';

// Form Steps
import StepOne    from './steps/01/StepOne';
import StepTwo    from './steps/02/StepTwo';
import StepThree  from './steps/03/StepThree';
import StepFour   from './steps/04/StepFour';
import StepFive   from './steps/05/StepFive';
import NavBar from './common/NavBar';


// Holds our application data store and sets routes up
const App = ({ store }) => (
  <Provider store={store}>
    <Fabric>

      <div className="ms-Grid App">
        <div className="ms-Grid-row">
          <div className="Page ms-borderBase ms-Grid-col ms-sm12 ms-lg8 ms-xxl6 ms-lgPush2 ms-xxlPush3">

            <Router>
              <Switch>
                <Route path="/event"  component={Event} />
                <Route path="/admin"  component={Admin} />
                <Redirect from="/" exact to="/form/" />
                <Form>
                  <Route path="/form/" exact component={StepOne} />
                  <Route path="/form/user"   component={StepTwo} />
                  <Route path="/form/event"  component={StepThree} />
                  <Route path="/form/layout" component={StepFour} />
                  <Route path="/form/review" component={StepFive} />
                </Form>
              </Switch>
            </Router>

          </div>
        </div>

      </div>
    </Fabric>
  </Provider>
);
export default App;