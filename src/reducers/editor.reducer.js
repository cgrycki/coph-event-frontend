import { combineReducers } from 'redux';
import { initialState } from '../store/initialStore';
import { itemActions, toolbarActions } from '../constants/actionTypes';
import { calculateBusinessLogic } from '../utils'

/* Helpers */

const initialFormState = {
  furn_ids: initialState.editor.furn_ids,
  furn_items: initialState.editor.furn_items,
  canvas_props: initialState.editor.canvas_props,
  chairsPerTable: initialState.editor.chairsPerTable,
  selectedFurnType: initialState.editor.selectedFurnType,
  focusedFurnId: initialState.editor.focusedFurnId,
  calculated: initialState.editor.calculated
}

const filterById = (furn_items, item_id) => {
  // Filters object in array by item_id
  return furn_items.filter(d => d.item_id !== item_id);
};

const editorReducer = (state=initialFormState, action) => {
  switch (action.type) {
    case (itemActions.ADD_FURN_ITEM):
      // Gather position from action, and the current furniture type from state
      var { x, y } = action;
      var furn_type = state.selectedFurnType;
      
      // Create the new ID and increment for next item
      const item_id = furn_type + state.furn_ids[furn_type];  // circle0
      const incFurnID = state.furn_ids[furn_type] + 1;        // 0 + 1 => 1

      // Create and add the item to existing furniture array
      const furnToAdd = { item_id, furn_type, x, y, focused: true };
      const furnAdded = [...state.furn_items, furnToAdd];

      return {
        ...state,
        furn_ids      : { ...state.furn_ids, [furn_type]: incFurnID },
        furn_items    : furnAdded,
        focusedFurnId : item_id,
        calculated    : calculateBusinessLogic(furnAdded, state.chairsPerTable)
      }

    case (itemActions.UPD_FURN_ITEM):
      var { furn_type, item_id, x, y } = action;
      
      // Create updated item using old item's attributes.
      const updatedItem = { item_id, furn_type, x, y };
      
      // Filter items, set them all to unfocused, and add updated items.
      const filtered = filterById(state.furn_items, item_id);
      const furnUpdated = [...filtered, updatedItem];
      
      return {
        ...state,
        furn_items: furnUpdated,
        focusedFurnId: item_id
      }

    case (itemActions.RM_FURN_ITEM):
      var { furn_type, item_id } = action;
      // Filter out item and unfocus remaining.
      const furnItemsRemoved = filterById(state.furn_items, item_id);

      return {
        ...state,
        furn_items: furnItemsRemoved,
        focusedFurnId: '',
        calculated: calculateBusinessLogic(furnItemsRemoved, state.chairsPerTable)
      };
    
    case (itemActions.UPD_FURN_FOCUS):
      // If the currently selected item is focused, unselect it.
      const toggleFocus = (state.focusedFurnId === action.item_id) ? '' : action.item_id;
      return {...state, focusedFurnId: toggleFocus}
    
    case (toolbarActions.SET_SELECT_FURN):
      return { ...state, selectedFurnType: action.selectedFurnType };

    case (toolbarActions.SET_NUM_CHAIRS):
      return {
        ...state,
        chairsPerTable: action.chairsPerTable,
        calculated: calculateBusinessLogic(state.furn_items, action.chairsPerTable)
      };
    
    default:
      return state
  }
}

export default editorReducer