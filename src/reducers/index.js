/*
 * Reducers
 * Imports all reducers and exports them combined with Redux
 */

import { combineReducers } from 'redux';
import editorReducer from './editor.reducer';
import formReducer from './form.reducer';

export default combineReducers({
  formReducer,
  editorReducer
})
