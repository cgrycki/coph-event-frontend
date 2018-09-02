/**
 * Editor Reducer
 */
import initialStore from '../store/initialStore';
import { editorActions } from '../constants/actionTypes';
// Business logic


/**
 * Utility function to filter an array of objects based on an ID.
 * @param {*} arr List of objects representing our furniture items
 * @param {*} item_id String ID of 
 * @returns A copy of arr without object w/ matching id.
 */
const filterItem = (arr, item_id) => {
  return arr.slice().filter(d => d.item_id !== item_id);
}

const initialEditorStore = { ...initialStore.editor };


export const editorReducer = (state=initialEditorStore, action) => {
  let { type } = action;
  
  switch (type) {
    case editorActions.ADD_ITEM:
      // Gather variables to add item to layout
      var { x, y } = action;

      // Infer furniture type from our state, inc ID, and create item
      var furn_type   = state.layout.furn_type;
      var item_id     = furn_type + state.ids[furn_type];
      var item_to_add = { item_id, furn_type, x, y };

      // Increment ID and add item to furniture array
      var item_id_inc = furn_type + state.ids[furn_type] + 1;
      var ids_added   = { ...state.ids, furn_type: item_id_inc };
      var item_added = [...state.furniture.items, item_to_add];

      return {
        ...state,
        ids: ids_added,
        furniture: {...state.furniture, items: item_added}
        // Business logic
      };
    
    case editorActions.UPDATE_ITEM:
      // Gather attributes of item to update
      var { furn_type, item_id, x, y } = action;

      // Create a new object w/ updated attributes. Remove and add new obj
      var item_to_add = { furn_type, item_id, x, y };
      var items_removed = filterItem(state.furniture.items, item_id);
      var item_added = [...items_removed, item_to_add];

      return {
        ...state,
        furniture: {...state.furniture, items: item_added }
      };
    
    case editorActions.REMOVE_ITEM:
      // Gather ID of item to remove
      var item_id = action.item_id;
      
      // Filter from array
      var items_removed = filterItem(state.furniture.items, item_id);

      // Recalculate business logic
      return {
        ...state,
        furniture: {...state.furniture, items: items_removed },
        layout: {...state.layout, selected_item: null}
        // Business calc
      };

    case editorActions.SELECT_ITEM:
      // Get item ID to place in editor portion
      var { item_id } = action;

      return {
        ...state,
        layout: {...state.layout, selected_item: item_id }
      };

    /** Update our layouts object, assigning new configs to editor view. */
    case (editorActions.UPDATE_EDITOR):
      let newLayout = { ...state.layout, ...action.payload }
      
      return {
        ...state,
        layout: newLayout
      };
    
    default:
      return state;
  }
}