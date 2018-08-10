/**
 * Application Store configuration
 */
import { createStore, applyMiddleware, compose }  from 'redux'
import thunkMiddleware                            from 'redux-thunk'
import { createLogger }                           from 'redux-logger'
import initialStore                               from './initialStore';
import rootReducer                                from '../reducers';


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
export default configuredStore;
