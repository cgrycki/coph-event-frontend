/**
 * Persist Config
 */
import { persistReducer }   from 'redux-persist';
import storage              from 'redux-persist/lib/storage';
import { combineReducers }  from 'redux';
import  reducers            from '../reducers';

// Application config: login states, user email, admin
const configApp = {
  key: 'app'
}

// Form configuration
const configForm = {
  key      : 'form',
  storage  : storage,
  whitelist: ['errors']
}

// Room configuation
const configRooms = {
  key      : 'rooms',
  storage  : storage,
  whitelist: ['rooms']
}


// Combine our reducers with (optional) persistent configurations.
const rootReducer = combineReducers({
  app      : reducers.appReducer,
  diagram  : reducers.diagramReducer,
  events   : reducers.eventReducer,
  form     : persistReducer(configForm, reducers.formReducer),
  rooms    : persistReducer(configRooms, reducers.roomReducer),
  schedules: reducers.schedulesReducer
});


// Create a persising root reducer  
const persistConfig = {
  key      : 'root',
  storage  : storage,
  whitelist: []
}
const persistedReducer = persistReducer(persistConfig, rootReducer);


export default persistedReducer;