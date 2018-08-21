/**
 * Application Store configuration
 */
import { createStore, applyMiddleware, compose }  from 'redux'
import { connectRouter, routerMiddleware }        from 'connected-react-router';
import thunkMiddleware                            from 'redux-thunk'
import { createLogger }                           from 'redux-logger'
import initialStore                               from './initialStore';
import { createBrowserHistory }                   from 'history';
import rootReducer                                from '../reducers';
import { getDateISO }                             from '../utils/date.utils.js';


// Logging middleware
const loggerMiddleware = createLogger({ collapsed: true });


/**
 * Creates our application store configured with our initial state and connected to browser's history.
 * @param {Object} preloadedState - Object with application's store.
 * @param {Object} browserHistory - Instance of browser history to connect to application.
 * @returns {Object} store - Our store with browser history, async, and logging middleware.
 */
export function configureStore(preloadedState, browserHistory) {
  // Check if we have DevTools installed
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Create the store
  const store = createStore(
    connectRouter(browserHistory)(rootReducer),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(browserHistory),
        thunkMiddleware,
        loggerMiddleware)));
    
  // Dispatch the current date to the store
  store.dispatch({ type: 'UPDATE_FIELD', field: 'date', value: getDateISO(new Date())});

  return store;
}


export default configureStore;