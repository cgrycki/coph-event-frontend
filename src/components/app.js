import React from 'react';
import { Provider } from 'react-redux'
import { Switch, Redirect, BrowserRouter as Router, Route } from 'react-router-dom';

// Site components
import Form from './Form';
import Event from './Event';
import Admin from './Admin';

import StepOne from './steps/one/StepOne';
import StepTwo from './steps/two/StepTwo';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/event"  component={Event} />
        <Route path="/admin"  component={Admin} />
        <Redirect from="/" exact to="/form/basic" />
        <Form>
          <Route path="/form/basic" component={StepOne} />
          <Route path="/form/user" component={StepTwo} />
        </Form>
      </Switch>
    </Router>
  </Provider>
)

export default App;