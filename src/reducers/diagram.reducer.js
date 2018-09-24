import initialStore       from '../store/initialStore';
import { diagramActions } from '../constants/actionTypes';


/** UTILITIES ---------------------------------------------------------------*/
/**
 * Utility function to filter an array of objects based on an ID.
 * @param {*} arr List of objects representing our furniture items
 * @param {*} id String ID of 
 * @returns A copy of arr without object w/ matching id.
 */
const filterItem = (arr, id) => arr.slice().filter(d => d.id !== id);
const initialDiagramStore = { ...initialStore.diagram };


function addDiagramItem(state, action) {
  const { x, y } = action;
  // Infer furniture type from state, get current ID count, + create new item.
  const furn     = state.layout.furn_type;
  const id       = furn + state.ids[furn];
  const new_item = { id, furn, x, y, rot: 0 };

  // Increment furn type ID and add new item to diagram's list
  const furn_id_inc = state.ids[furn] + 1;
  const furn_ids    = {...state.ids, [furn]: furn_id_inc};
  const new_items   = [...state.items, new_item];

  return {
    ...state,
    ids   : furn_ids,
    items : new_items,
    layout: { ...state.layout, selected_item: id }
  };
}

function updateDiagramItem(state, action) {
  const { id, furn, x, y, rot } = action;
  const updatedItem = { id, furn, x, y, rot };

  const updatedItems = [...filterItem(state.items, id), updatedItem];
  return { ...state, items: updatedItems };
}

function removeDiagramItem(state, action) {
  const { id } = action;
  const removedItems = [...filterItem(state.items, id)];

  // Clear selection as only selected items can be removed
  const nullSelection = { ...state.layout, selected_item: null };

  return { ...state, items: removedItems, layout: nullSelection };
}

function selectDiagramItem(state, action) {
  const { id } = action;
  const curSelection = state.layout.selected_item;
  const newSelection = (id !== curSelection) ? id : null;

  return { ...state, layout: { ...state.layout, selected_item: newSelection }};
}

function populateDiagramItems(state, action) {
  const { items, counts, ids } = action.payload;
  const populated_counts = { ...initialDiagramStore.counts, ...counts };
  return { ...state, items, counts: populated_counts, ids };
}

function clearDiagramItems(state, action) {
  return {
    ...state,
    counts: { ...initialDiagramStore.counts },
    ids   : { ...initialDiagramStore.ids },
    items : []
  };
}



/** REDUCER ------------------------------------------------------------------*/
export const diagramReducer = (state=initialDiagramStore, action) => {
  const { type } = action;
  switch(type) {

    /** Diagram Items ----------------------------------------------------------*/
    case diagramActions.DIAGRAM_ADD_ITEM:
      return addDiagramItem(state, action);

    case diagramActions.DIAGRAM_UPDATE_ITEM:
      return updateDiagramItem(state, action);

    case diagramActions.DIAGRAM_REMOVE_ITEM:
      return removeDiagramItem(state, action);

    case diagramActions.DIAGRAM_RESCALE_ITEMS:
      return { ...state, items: action.items };

    /** Diagram Settings -------------------------------------------------------*/
    case diagramActions.DIAGRAM_SELECT_ITEM:
      return selectDiagramItem(state, action);

    case diagramActions.DIAGRAM_UPDATE_LAYOUT:
      return {...state, layout: { ...state.layout, ...action.payload }};

    case diagramActions.DIAGRAM_UPDATE_COUNTS:
      return {...state, counts: { ...state.counts, ...action.payload }};

    /** RESTful Actions --------------------------------------------------------*/
    case diagramActions.DIAGRAM_LAYOUTS_LOADING:
      return { ...state, layouts_loading: true };

    case diagramActions.DIAGRAM_LAYOUTS_SUCCESS:
      return { ...state, layouts_loading: false, layouts_error: null, pub_layouts: action.payload };

    case diagramActions.DIAGRAM_LAYOUTS_ERROR:
      return { ...state, layouts_loading: false, layouts_error: action.payload };

    case diagramActions.DIAGRAM_LAYOUTS_RESET:
      return { ...state, layouts_loading: false, layouts_error: null };
      
    /** External Actions -------------------------------------------------------*/
    case diagramActions.DIAGRAM_POPULATE_ITEMS:
      return populateDiagramItems(state, action);

    case diagramActions.DIAGRAM_CLEAR_ITEMS:
      return clearDiagramItems(state, action);

    default:
      return state;
  }
}