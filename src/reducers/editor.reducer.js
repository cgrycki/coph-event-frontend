/**
 * Editor Reducer
 */
import initialStore from '../store/initialStore';
import { editorActions } from '../constants/actionTypes';


/**
 * Utility function to filter an array of objects based on an ID.
 * @param {*} arr List of objects representing our furniture items
 * @param {*} id String ID of 
 * @returns A copy of arr without object w/ matching id.
 */
const filterItem = (arr, id) => arr.slice().filter(d => d.id !== id);
const initialEditorStore = { ...initialStore.editor };


export const editorReducer = (state=initialEditorStore, action) => {
  let id;
  let { type } = action;
  
  switch (type) {

    /** Adds an furniture item to store */
    case editorActions.ADD_ITEM:
      var { x, y } = action;

      // Infer furniture type from our state, inc ID, and create item
      var furn        = state.layout.furn_type;
      var item_id     = furn + state.ids[furn];
      var item_to_add = { id: item_id, furn, x, y };

      // Increment ID and add item to furniture array
      var item_id_inc = state.ids[furn] + 1;
      var ids_added   = { ...state.ids, [furn]: item_id_inc };
      var item_added  = [...state.furniture.items, item_to_add];

      return {
        ...state,
        ids      : ids_added,
        furniture: {...state.furniture, items: item_added}
        // Business logic
      };
    
    
    case editorActions.UPDATE_ITEM:
      // Gather attributes of item to update
      let { furn, id, x, y } = action;

      // Create a new object w/ updated attributes. Remove and add new obj
      var item_to_add   = { furn, id, x, y };
      var items_removed = filterItem(state.furniture.items, id);
      var item_added    = [...items_removed, item_to_add];

      return {
        ...state,
        furniture: {...state.furniture, items: item_added }
      };
    
    case (editorActions.REMOVE_ITEM):
      // Gather ID of item to remove and filter from array
      var item_id = action.id;
      var items_removed = filterItem(state.furniture.items, item_id);

      // Recompute counts from business logic
      return {
        ...state,
        furniture: {...state.furniture, items: items_removed },
        layout: {...state.layout, selected_item: null }
        // Business calc
      };

    case editorActions.SELECT_ITEM:
      // Get item ID to place in editor portion
      id = action.id;

      return {
        ...state,
        layout: {...state.layout, selected_item: id }
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