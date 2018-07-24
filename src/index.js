// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';


// Styles
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import '../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './assets/index.css';


// Reducers and Components
import reducers from './reducers';
import App from './components/app';


/* Create Redux store to initialize application. */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


/* Initialize icons for Microsoft Fabric UI. */
initializeIcons();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();