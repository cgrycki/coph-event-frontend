/**
 * Application Store configuration
 */
import { createStore, applyMiddleware, compose }  from 'redux/dist/redux';
import { persistStore }                           from 'redux-persist';
import persistedReducer                           from './persistConfig';
import { connectRouter, routerMiddleware }        from 'connected-react-router';
import thunkMiddleware                            from 'redux-thunk/dist/redux-thunk';
import { createLogger }                           from 'redux-logger/dist/redux-logger';
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
    connectRouter(browserHistory)(persistedReducer),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(browserHistory),
        thunkMiddleware,
        loggerMiddleware
      )
    )
  );

  // Wrap our store in Redux-Persist's function to hydrate/flush
  const persistedStore = persistStore(store);
    
  // Dispatch the current date to the store in case the hydration is stale
  store.dispatch({ type: 'UPDATE_FIELD', field: 'date', value: getDateISO(new Date())});

  return {store, persistedStore};
}


export default configureStore;