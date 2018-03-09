/*
 * Reducers
 * Imports all reducers and exports them combined with Redux
 */

import { combineReducers } from 'redux';
import formReducer from './form.reducer';
import idReducer from './id.reducer';

export default combineReducers({
  formReducer,
  idReducer
})