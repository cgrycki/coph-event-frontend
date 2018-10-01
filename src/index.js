// Libraries
import React                    from 'react';
import ReactDOM                 from 'react-dom';
import registerServiceWorker    from './registerServiceWorker';
import { createBrowserHistory } from 'history';
import { initializeIcons }      from 'office-ui-fabric-react/lib/Icons';
import { unregister }           from './registerServiceWorker';

// Styles
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css';
import '../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
import './assets/index.css';


// Application data store and entry point
import initialStore   from './store/initialStore';
import configureStore from './store/configureStore';
import App            from './components/App';


// Initialize icons for Microsoft Fabric UI.
initializeIcons();


// Create the store
const history = createBrowserHistory();
const {
  store         : configuredStore,
  persistedStore: persistor
} = configureStore(initialStore, history);


ReactDOM.render(
  <App store={configuredStore} persistor={persistor} history={history} />,
  document.getElementById('root')
);

//registerServiceWorker();
unregister();