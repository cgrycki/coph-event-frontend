// Dependencies
import React        from 'react';
import { Provider } from 'react-redux'
import { Fabric }   from 'office-ui-fabric-react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

// Site components
import NavBar         from './common/NavBar/';
import Page           from './common/Page';
import ProtectedRoute from './common/ProtectedRoute';
import Home           from './Home';
import EventPage      from './EventPage/';
import Dashboard      from './Dashboard/Dashboard';

// Form + Steps
import Form           from './Form/';
import StepOne        from './Form/StepOne';
import StepTwo        from './Form/StepTwo';
import StepThree      from './Form/StepThree';
import StepFour       from './Form/StepFour';


// Container
// Holds our application data store and sets routes up
const App = ({ store }) => (
  <Provider store={store}>
    <Fabric dir="ltr">
      <Router>

        <div className="ms-Grid App">
          <div className="ms-Grid-row">
            <Page>
              
              <NavBar />
              <Switch>
                <Route path="/" exact                     component={Home} />
                <ProtectedRoute path="/dashboard"         Component={Dashboard} />
                <ProtectedRoute 
                  path="/event/:package_id/:signature_id?" 
                                                          Component={EventPage} />
                <Form>
                  <ProtectedRoute path="/form/user"   Component={StepOne} />
                  <ProtectedRoute path="/form/event"  Component={StepTwo} />
                  <ProtectedRoute path="/form/layout" Component={StepThree} />
                  <ProtectedRoute path="/form/review" Component={StepFour} />
                </Form>
              </Switch>

            </Page>
          </div>
        </div>

      </Router>
    </Fabric>
  </Provider>
);
export default App;