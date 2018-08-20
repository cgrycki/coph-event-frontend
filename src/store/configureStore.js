/**
 * Application Store configuration
 */
import { createStore, applyMiddleware, compose }  from 'redux'
import thunkMiddleware                            from 'redux-thunk'
import { createLogger }                           from 'redux-logger'
import initialStore                               from './initialStore';
import rootReducer                                from '../reducers';
import { getDateISO }                             from '../utils/date.utils.js';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

// Logging middleware
const loggerMiddleware = createLogger({ collapsed: true });


// Function to create a store with async + logging
export function configureStore(preloadedState, browserHistory) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    connectRouter(browserHistory)(rootReducer),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(browserHistory),
        thunkMiddleware,
        loggerMiddleware
      )
    )
  );
}

// Default export, configured store populated from our initialStore
const history = createBrowserHistory();
const configuredStore = configureStore(initialStore, history);

// Dispatch the current date to the store
configuredStore.dispatch({ 
  type: 'UPDATE_FIELD', 
  field: 'date', 
  value: getDateISO(new Date())
});

export default configuredStore;
