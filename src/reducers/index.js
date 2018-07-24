/**
 * Combine reducers
 */
import { appReducer } from './app.reducer';
import { editorReducer } from './editor.reducer';
import { fieldReducer } from './field.reducer';
import { roomReducer } from './room.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  appReducer,
  editorReducer,
  fieldReducer,
  roomReducer
});