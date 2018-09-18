/**
 * diagram Actions
 */
import { diagramActions } from '../constants/actionTypes';
import Counter            from '../utils/Counter';


/**
 * Adds an furniture item to our diagram editor's layout. Type and ID inferred later
 * @param {float} x Item's horizontal position within layout
 * @param {float} y Item's vertical position within layout.
 */
const addEditorItem = ({ x, y }) => ({
  type: diagramActions.DIAGRAM_ADD_ITEM,
  x,
  y
});


/**
 * Updates an furniture item in our editor's layout.
 * @param {string} furn Designates the updated furniture type
 * @param {string} id Current ID from event
 * @param {float} x Item's horizontal position within layout
 * @param {float} y Item's vertical position within layout.
 */
export const updateEditorItem = ({ furn, id, x, y, rot=0 }) => ({
  type: diagramActions.DIAGRAM_UPDATE_ITEM,
  furn,
  id,
  x,
  y,
  rot
});


/**
 * Removes an item from our editor.
 * @param {string} id ID of item we're removing
 */
const removeEditorItem = id => ({
  type: diagramActions.DIAGRAM_REMOVE_ITEM,
  id
});


/**
 * Updates our editor; zooming, panning, furniture type, or chairs_per_table
 * @param {object} fields Object containing the new settings for our layout.
 */
export const updateEditor = fields => ({
  type   : diagramActions.DIAGRAM_UPDATE_LAYOUT,
  payload: fields
});


const rescaleItemCoords = items => ({
  type: diagramActions.DIAGRAM_RESCALE_ITEMS,
  items
});


/** Higher Order Action, dispatching dimension update and replacing items. */
export const resizeAndRescale = (dimensions, items) => dispatch => {
  dispatch(selectEditorItem(null));
  dispatch(updateEditor(dimensions));
  dispatch(rescaleItemCoords(items));
}


/**
 * Select an item in our layout, nullifying other selections.
 * @param {string} id ID representing the furniture item to select.
 */
export const selectEditorItem = id => ({
  type   : diagramActions.DIAGRAM_SELECT_ITEM,
  id
});


/**
 * Returns an action creator for updating the diagram count object.
 * @param {object} counts 
 */
const updateEditorCounts = counts => ({
  type   : diagramActions.DIAGRAM_UPDATE_COUNTS,
  payload: counts
});


export const addItemAndUpdateDiagram = ({ x, y }) => {
  return (dispatch, getState) => {
    // Clear the selection
    dispatch(selectEditorItem(null));

    // Add the furniture item
    dispatch(addEditorItem({ x, y }));

    // Get the current state and extract variables needed to compute counts
    const currentState = getState();
    const { items, layout: { chairs_per_table }} = currentState.diagram;

    // Count em up
    const rawCounts = Counter.getFurnItemCount(items);
    const counts    = Counter.getFurnRackCounts(rawCounts, chairs_per_table);

    // Update editor
    dispatch(updateEditorCounts(counts));
  }
}

export const removeItemAndUpdateDiagram = (id) => {
  return (dispatch, getState) => {
    // Remove item
    dispatch(removeEditorItem(id));

    // Get the current state and extract variables needed to compute counts
    const currentState = getState();
    const { items, layout: { chairs_per_table }} = currentState.diagram;

    // Count em up
    const rawCounts = Counter.getFurnItemCount(items);
    const counts    = Counter.getFurnRackCounts(rawCounts, chairs_per_table);

    // Update editor
    dispatch(updateEditorCounts(counts));
  }
}

export const updateChairsAndCounts = (chairs_per_table) => {
  return (dispatch, getState) => {
    // Update the chairs attribute
    dispatch(updateEditor({ chairs_per_table }));

    // Get the change afterward
    const currentState = getState();
    const { items } = currentState.diagram;

    // Count em up
    const rawCounts = Counter.getFurnItemCount(items);
    const counts    = Counter.getFurnRackCounts(rawCounts, chairs_per_table);

    // Update editor counts
    dispatch(updateEditorCounts(counts));
  }
}


/**
 * Takes an array of furniture items (which may or may not be dirty;
 * i.e. not strictly increasing IDs) and reassigns IDs. Additionally, it counts
 * the number of furniture items and computes the information for furn. counts and
 * the IT office.
 * @param {object[]} items Array of furniture items from a saved event.
 * @param {number} chairs_per_table
 */
export const populateEditor = ({ items, chairs_per_table=6 }) => {
  // Get raw counts from our furn items
  const rawFurnCounts  = Counter.getFurnItemCount(items);
  const furnRackCounts = Counter.getFurnRackCounts(rawFurnCounts, chairs_per_table);

  // Reassign IDs
  const itemsWithAssignedIDs = Counter.assignFurnitureIDs(items);

  // Copy the counts so we can start the editor without saving confliting IDs
  const ids = Object.assign({}, rawFurnCounts);

  return {
    type   : diagramActions.DIAGRAM_POPULATE_ITEMS,
    payload: {
      items : itemsWithAssignedIDs,
      counts: furnRackCounts,
      ids
    }
  };
};


export const clearEditor = () => ({
  type: diagramActions.DIAGRAM_CLEAR_ITEMS
});



const fetchDiagramsLoading = () => ({
  type: diagramActions.DIAGRAM_LAYOUTS_LOADING
})

const fetchDiagramsSuccess = response => ({
  type   : diagramActions.DIAGRAM_LAYOUTS_SUCCESS,
  payload: response
})

const fetchDiagramsError = error => ({
  type   : diagramActions.DIAGRAM_LAYOUTS_ERROR,
  payload: error
})

const fetchDiagramsReset = () => ({
  type: diagramActions.DIAGRAM_LAYOUTS_RESET
})