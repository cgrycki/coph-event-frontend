// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';


// Styles
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import '../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './assets/index.css';


// Application data store and entry point
import configuredStore from './store/configureStore';
import App from './components/App';


/* Initialize icons for Microsoft Fabric UI. */
initializeIcons();


ReactDOM.render(
  <App store={configuredStore} />,
  document.getElementById('root')
);
registerServiceWorker();