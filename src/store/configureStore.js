/**
 * Application Store configuration
 */
import { createStore, applyMiddleware, compose }  from 'redux'
import thunkMiddleware                            from 'redux-thunk'
import { createLogger }                           from 'redux-logger'
import initialStore                               from './initialStore';
import rootReducer                                from '../reducers';
import { getDateISO }                             from '../utils/date.utils.js';


// Logging middleware
const loggerMiddleware = createLogger({ collapsed: true });


// Function to create a store with async + logging
export function configureStore(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
  )
}

// Default export, configured store populated from our initialStore
const configuredStore = configureStore(initialStore);

// Dispatch the current date to the store
configuredStore.dispatch({ 
  type: 'UPDATE_FIELD', 
  field: 'date', 
  value: getDateISO(new Date())
});

export default configuredStore;
