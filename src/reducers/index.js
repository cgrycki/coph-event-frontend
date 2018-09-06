/**
 * Combine reducers
 */
import { appReducer }       from './app.reducer';
import { diagramReducer }   from './diagram.reducer';
import { fieldReducer }     from './field.reducer';
import { roomReducer }      from './room.reducer';
import { eventReducer }     from './events.reducer';
import { schedulesReducer}  from './schedules.reducer';
import { combineReducers }  from 'redux';

export default combineReducers({
  app      : appReducer,
  diagram  : diagramReducer,
  fields   : fieldReducer,
  rooms    : roomReducer,
  events   : eventReducer,
  schedules: schedulesReducer
});