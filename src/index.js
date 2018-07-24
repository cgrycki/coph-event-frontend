// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';


// Styles
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import '../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './assets/index.css';


// Reducers and Components
import App from './components/app';
import configuredStore from './store/configureStore';


/* Initialize icons for Microsoft Fabric UI. */
initializeIcons();


ReactDOM.render(
  <Provider store={configuredStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();