// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

// Styles
import './assets/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';

// Self made
import reducers from './reducers';
import App from './components/app.component';

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