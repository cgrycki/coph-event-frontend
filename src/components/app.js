import React from 'react';
import { Provider } from 'react-redux'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

// Site components
import Form from './Form';
import Event from './Event';
import Admin from './Admin';

const App = ({ store }) => (
  <Provider store={store}>
    <Router path="/">
      <Switch>
        <Route path="/"       component={Form} />
        <Route path="/event"  component={Event} />
        <Route path="/admin"  component={Admin} />
      </Switch>
    </Router>
  </Provider>
)

export default App;