// Dependencies
import React                from 'react';
import { Provider }         from 'react-redux'
import { PersistGate }      from 'redux-persist/lib/integration/react';
import { ConnectedRouter }  from 'connected-react-router';
import { Route, Switch }    from 'react-router';
import { Fabric }           from 'office-ui-fabric-react';

// Site components
import NavBar         from './common/NavBar/';
import Page           from './common/Page';
import ProtectedRoute from './common/ProtectedRoute';
import Home           from './Home';
import About          from './About';
import EventPage      from './EventPage/';
import Dashboard      from './Dashboard/';
import Calendar       from './Calendar/';
import Footer         from './common/Footer';

// Form + Steps
import Form           from './Form/';
import StepOne        from './Form/StepOne';
import StepTwo        from './Form/StepTwo';
import StepThree      from './Form/StepThree';
import StepFour       from './Form/StepFour';
import StepFive       from './Form/StepFive';


// Container -- Holds our application data store and sets routes up
const App = ({ store, persistor, history }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Fabric dir="ltr">
          <NavBar />

          <div className="ms-Grid App">
            <div className="ms-Grid-row">
              <Page>
                
                <Switch>
                  {/** Testing routes ****************************************/}
                  <Route path="/testing"          component={StepFive} />
                  
                  {/** Public Routes, no login required. ********************/}
                  <Route path="/"         exact   component={Home} />
                  <Route path="/about"    exact   component={About} />
                  <Route path="/calendar" exact   component={Calendar} />

                  {/** Protected Routes, login required. **************************/}
                  <ProtectedRoute path="/dashboard"     Component={Dashboard} />
                  <ProtectedRoute path="/event/:package_id/:signature_id?" 
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

          <Footer/>
        </Fabric>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;