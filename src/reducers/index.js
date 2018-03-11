/*
 * Reducers
 * Imports all reducers and exports them combined with Redux
 */

/*
import { combineReducers } from 'redux';
import { initialState } from '../store/initialStore';
import formReducer from './form.reducer';
import idReducer from './id.reducer';
import itemReducer from './item.reducer';

export default combineReducers({
  formReducer,
  idReducer,
  itemReducer
})
*/

import { combineReducers } from 'redux';
import { optimizedState } from '../store/initialStore';

import editorReducer from './new.editor.reducer';
import formsReducer from './new.form.reducer';

export default combineReducers({
  formsReducer,
  editorReducer
})
