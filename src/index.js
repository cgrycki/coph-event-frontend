import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './assets/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// reducer
import reducers from './reducers';
// actions

import App from './components/app.component';
import registerServiceWorker from './registerServiceWorker';

// create store
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();