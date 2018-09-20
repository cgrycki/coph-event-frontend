// Dependencies
import React                from 'react';
import { Provider }         from 'react-redux'
import { PersistGate }      from 'redux-persist/lib/integration/react';
import { ConnectedRouter }  from 'connected-react-router';
import { Route, Switch }    from 'react-router';
import { Fabric }           from 'office-ui-fabric-react';

// Site components
import Page           from './common/Page';
import ProtectedRoute from './common/ProtectedRoute';
import Home           from './Home';
import About          from './About';
import EventPage      from './EventPage/';
import Dashboard      from './Dashboard/';
import Calendar       from './Calendar/';

// Form + Steps
import Form           from './Form/';
import FormWho        from './Form/FormStepTwo';    // email, attendance
import FormWhat       from './Form/FormStepThree';  // what: course, food, MFK
import FormWhenWhere  from './Form/FormStepFour';   // date+time+place
import FormLayout     from './Form/FormStepFive';   // diagram
import FormMisc       from './Form/FormStepSix';    // comments
import FormReview     from './Form/FormStepSeven';  // review


// Container -- Holds our application data store and sets routes up
const App = ({ store, persistor, history }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Fabric dir="ltr" className='fullHeight'>
          
          <Page>
            <Switch>
              {/** Testing routes ****************************************/}
              {/*<Route path="/testing"          component={StepFive} /> */}
              
              {/** Public Routes, no login required. ********************/}
              <Route path="/"         exact   component={Home} />
              <Route path="/about"    exact   component={About} />
              <Route path="/calendar" exact   component={Calendar} />

              {/** Protected Routes, login required. **************************/}
              <ProtectedRoute path="/dashboard"     Component={Dashboard} />
              <ProtectedRoute path="/event/:package_id/:signature_id?" 
                                                    Component={EventPage} />
              <Form>
                <ProtectedRoute path="/form/who"    Component={FormWho} />
                <ProtectedRoute path="/form/what"   Component={FormWhat} />
                <ProtectedRoute path="/form/when"   Component={FormWhenWhere} />
                <ProtectedRoute path="/form/layout" Component={FormLayout} />
                <ProtectedRoute path="/form/misc"   Component={FormMisc} />
                <ProtectedRoute path="/form/review" Component={FormReview} />
              </Form>
            </Switch>
          </Page>

        </Fabric>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;