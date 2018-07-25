/**
 * Combine reducers
 */
import { appReducer } from './app.reducer';
import { editorReducer } from './editor.reducer';
import { fieldReducer } from './field.reducer';
import { roomReducer } from './room.reducer';
import { eventReducer } from './events.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  app   : appReducer,
  editor: editorReducer,
  fields: fieldReducer,
  rooms : roomReducer,
  events: eventReducer
});