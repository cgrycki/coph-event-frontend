import React from 'react';
import { Provider } from 'react-redux'
import { Switch, Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import { Fabric } from 'office-ui-fabric-react';


// Site components
import Navbar     from './common/NavBar';
import Event      from './Event';
import Dashboard  from './Dashboard';

// Form + Steps
import Form       from './Form/';
import StepOne    from './Form/01/StepOne';
import StepTwo    from './Form/02/StepTwo';
import StepThree  from './Form/03/StepThree';
import StepFour   from './Form/04/StepFour';
import StepFive   from './Form/05/StepFive';


// Holds our application data store and sets routes up
const App = ({ store }) => (
  <Provider store={store}>
    <Fabric>

      <div className="ms-Grid App">
        <Navbar/>
        <div className="ms-Grid-row">
          <div className="Page ms-borderBase ms-Grid-col ms-sm12 ms-lg8 ms-xxl6 ms-lgPush2 ms-xxlPush3">

            <Router>
              <Switch>
                <Route path="/event"      component={Event} />
                <Route path="/dashboard"  component={Dashboard} />
                <Redirect from="/"        to="/form/" exact />
                <Form>
                  <Route path="/form/"       component={StepOne} exact />
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