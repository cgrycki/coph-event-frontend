// Dependencies
import React        from 'react';
import { Provider } from 'react-redux'
import { Fabric }   from 'office-ui-fabric-react';
import { Switch, Redirect, BrowserRouter as Router, Route } from 'react-router-dom';

// Site components
import Navbar     from './common/NavBar';
import Home       from './Home';
import Event      from './Event';
import Dashboard  from './Dashboard';

// Form + Steps
import Form       from './Form/';
import StepOne    from './Form/StepOne';
import StepTwo    from './Form/StepTwo';
import StepThree  from './Form/StepThree';
import StepFour   from './Form/StepFour';


// Holds our application data store and sets routes up
const App = ({ store }) => (
  <Provider store={store}>
    <Fabric>

      <div className="ms-Grid App">
        <div className="ms-Grid-row">
          <div className="Page ms-borderBase ms-Grid-col ms-sm12 ms-lg10 ms-xxl8 ms-lgPush1 ms-xxlPush2">

            <Router>
              <div>
                <Navbar />
                <Switch>
                  <Route path="/event"      component={Event} />
                  <Route path="/dashboard"  component={Dashboard} />
                  <Route path="/" exact     component={Home} />
                  <Form>
                    <Route path="/form/user"   component={StepOne} />
                    <Route path="/form/event"  component={StepTwo} />
                    <Route path="/form/layout" component={StepThree} />
                    <Route path="/form/review" component={StepFour} />
                  </Form>
                </Switch>
              </div>
            </Router>

          </div>
        </div>

      </div>
    </Fabric>
  </Provider>
);
export default App;