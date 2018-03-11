import { combineReducers } from 'redux';
import { initialState } from '../store/initialStore';
import { itemActions } from '../constants/actionTypes';

/* Helpers */

const initialFormState = {
  furn_ids: initialState.editor.furn_ids,
  furn_items: initialState.editor.furn_items,
  canvas_props: initialState.editor.canvas_props,
  chairsPerTable: initialState.editor.chairsPerTable,
  selectedFurnType: initialState.editor.selectedFurnType,
  focusedFurnId: initialState.editor.focusedFurnId
}

function filterAndUnfocus(furn_items, furn_type, item_id) {
  let furn_type_items = [...furn_items[furn_type]];         // Grab the array from the furn_items object
  let filtered = filterItemsById(furn_type_items, item_id); // Filter the items
  let unfocused = unfocusItems(filtered);                   // Set the focused property to false
  return unfocused;
}

const filterItemsById = (furn_items, item_id) => {
  return furn_items.filter(d => d.item_id !== item_id);     // Filters object in array by item_id
} 

const unfocusItems= (furn_items) => {
  return furn_items.map(d => ({ ...d, focused: false}));    // Sets the focused property on nested array to be false
}

const itemReducer = (state=initialFormState, action) => {
  switch (action.type) {

    case (itemActions.ADD_FURN_ITEM):
      /* INCOMPLETE, we may have to add the incrementing furniture ID here.
        * STEPS:
        - get currentID of furn_type
        - Set the existing items as unfocused.
        - add new furn_item object to furn_items
        - increment the furn_type ID
      */
      var { furn_type, x, y } = action;

      const item_id = furn_type + state.furn_ids[furn_type];  // circle0
      const incFurnID = state.furn_ids[furn_type] + 1;        // 0 + 1 => 1
      
      const furnToAdd = { item_id, furn_type, x, y, focused: false };
      const furnAdded = [...state.furn_items[furn_type], furnToAdd];

      //console.log('furniture to add: ', furnToAdd, furnAdded);
      return {
        ...state,
        furn_ids: {
          ...state.furn_ids,
          [furn_type]: incFurnID
        },
        furn_items: {
          ...state.furn_items,
          [furn_type]: furnAdded
        }
      }

    case (itemActions.UPD_FURN_ITEM):
      /*
      * INCOMPLETE
      * STEPS:
          - get the furniture item by filtering appropriate array using ID
          - Update item in array
      */
      var { furn_type, item_id, x, y } = action;
      
      const updatedItem = { item_id, furn_type, x, y, focused: true };
      const filteredAndUnfocused = filterAndUnfocus(state.furn_items, furn_type, item_id);
      const furnUpdated = [...filteredAndUnfocused, updatedItem]
      
      //console.log('furniture to update: ', state, action);
      return {
        ...state,
        furn_items: {
          ...state.furn_items,
          [furn_type]: furnUpdated
        }
      }

    case (itemActions.RM_FURN_ITEM):
      /*  INCOMPLETE
          Steps:
            - filter out offending item
            - unfocus items, because this is triggered by a double click
            - update calculated variables
      */
      var { furn_type, item_id } = action;
      const furnItemsRemoved = filterAndUnfocus(state.furn_items, furn_type, item_id);

      // console.log('Furniture removed: ', item_id);
      return {
        ...state,
        furn_items: {
          ...state.furn_items,
          [furn_type]: furnItemsRemoved
        }
      };

    default:
      return state
  }
}

export default itemReducer