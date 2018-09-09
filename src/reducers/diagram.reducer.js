import initialStore     from '../store/initialStore';
import {diagramActions} from '../constants/actionTypes';

/**
 * Utility function to filter an array of objects based on an ID.
 * @param {*} arr List of objects representing our furniture items
 * @param {*} id String ID of 
 * @returns A copy of arr without object w/ matching id.
 */
const filterItem = (arr, id) => arr.slice().filter(d => d.id !== id);
const initialDiagramStore = { ...initialStore.diagram };


export const diagramReducer = (state=initialDiagramStore, action) => {
  let {type} = action;
  switch(type) {

    /** DIAGRAM ITEMS -------------------------------------------------------*/
    case diagramActions.DIAGRAM_ADD_ITEM:
      var {x, y} = action;

      // Inferfurniture type from state, get current ID count, + create new item.
      var furn     = state.layout.furn_type;
      var id       = furn + state.ids[furn];
      let new_item = {id, furn, x, y};

      // Increment furn type ID and add new item to diagram's list
      let furn_id_inc = state.ids[furn] + 1;
      let furn_ids    = {...state.ids, [furn]: furn_id_inc};
      let new_items   = [...state.items, new_item];

      // Increment counter for furniture type
      let new_counts = {...state.counts, [furn]: state.counts[furn] + 1};

      return {
        ...state,
        ids   : furn_ids,
        items : new_items,
        counts: new_counts,
        layout: {
          ...state.layout, selected_item: id
        }
      };

    case diagramActions.DIAGRAM_UPDATE_ITEM:
      // Desconstruct arguments and reconstruct new obj.
      var {id, furn, x, y} = action;
      let updated_item = {id, furn, x, y};

      // Remove old item and add updated
      let updated_items = [...filterItem(state.items, id), updated_item];
      return {...state, items: updated_items};

    case diagramActions.DIAGRAM_REMOVE_ITEM:
      var {id} = action;
      let removed_items = [...filterItem(state.items, id)];

      // Decrement counter
      //let dec_counts = {...state.counts, action.furn}
      return {...state, items: removed_items};

    /** Diagram Settings ---------------------------------------------------------*/
    case diagramActions.DIAGRAM_SELECT_ITEM:
      var {id} = action;
      let current_selected = state.layout.selected_item;

      let new_selected = (id !== current_selected) ? id : null;
      return {...state, layout: {...state.layout, selected_item: new_selected}};

    case diagramActions.DIAGRAM_UPDATE_EDITOR:
      let new_layout = {...state.layout, ...action.payload};
      return {...state, layout: new_layout};

    /** External actions ---------------------------------------------------------*/
    case diagramActions.DIAGRAM_POPULATE_ITEMS:
      let { items, counts, ids } = action.payload;
      return {...state, items, counts, ids };
      
    default:
      return state;
  }
}