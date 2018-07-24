/**
 * Application Store configuration
 */
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import initialStore from './initialStore';
import rootReducer from '../reducers';


// Logging middleware
const loggerMiddleware = createLogger()


// Function to create a store with async + logging
export function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}


// Default export, configured store populated from our initialStore
const configuredStore = configureStore(initialStore);
export default configuredStore;