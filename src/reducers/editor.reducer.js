import { initialState } from '../store/initialStore';
import { itemActions } from '../constants/actionTypes';

import itemReducer from './item.reducer';
import { combineReducers } from 'redux';


/* Helpers */
// 

/* Reducers */

const initialFormState = {
  furn_ids: initialState.editor.furn_ids,
  furn_items: initialState.editor.furn_items,
  canvas_props: initialState.editor.canvas_props,
  chairsPerTable: initialState.editor.chairsPerTable,
  selectedFurnType: initialState.editor.selectedFurnType,
  focusedFurnId: initialState.editor.focusedFurnId
}

const editorReducer = combineReducers({
  initialFormState,
  itemReducer
})

export default editorReducer