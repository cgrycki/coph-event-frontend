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
export const addEditorItem = ({ x, y }) => ({
  type     : diagramActions.DIAGRAM_ADD_ITEM,
  x,
  y
});


/**
 * Select an item in our layout, nullifying other selections.
 * @param {string} id ID representing the furniture item to select.
 */
export const selectEditorItem = id => ({
  type   : diagramActions.DIAGRAM_SELECT_ITEM,
  id
});


/**
 * Updates an furniture item in our editor's layout.
 * @param {string} furn Designates the updated furniture type
 * @param {string} id Current ID from event
 * @param {float} x Item's horizontal position within layout
 * @param {float} y Item's vertical position within layout.
 */
export const updateEditorItem = (furn, id, x, y) => ({
  type     : diagramActions.DIAGRAM_UPDATE_ITEM,
  furn,
  id,
  x,
  y
});


/**
 * Removes an item from our editor.
 * @param {string} id ID of item we're removing
 */
export const removeEditorItem = ({ id, furn }) => ({
  type: diagramActions.DIAGRAM_REMOVE_ITEM,
  id,
  furn
});


/**
 * Updates our editor; zooming, panning, furniture type, or chairs_per_table
 * @param {object} fields Object containing the new settings for our layout.
 */
export const updateEditor = fields => ({
  type   : diagramActions.DIAGRAM_UPDATE_LAYOUT,
  payload: fields
});


/**
 * Returns an action creator for updating the diagram count object.
 * @param {object} counts 
 */
export const updateEditorCounts = counts => ({
  type: diagramActions.DIAGRAM_UPDATE_COUNTS,
  payload: counts
});


/**
 * Takes an array of furniture items (which may or may not be dirty;
 * i.e. not strictly increasing IDs) and reassigns IDs. Additionally, it counts
 * the number of furniture items and computes the information for furn. counts and
 * the IT office.
 * @param {object[]} savedItems Array of furniture items from a saved event.
 * @param {number} chairs_per_table 
 */
export const populateEditor = (savedItems, chairs_per_table) => {
  // Get raw counts from our furn items
  const rawFurnCounts  = Counter.getFurnItemCount(savedItems);
  const furnRackCounts = Counter.getFurnRackCounts(rawFurnCounts, chairs_per_table);

  // Reassign IDs
  const itemsWithAssignedIDs = Counter.assignFurnitureIDs(savedItems);

  // Copy the counts so we can start the editor without saving confliting IDs
  const ids = Object.assign({}, rawCounts);

  return {
    type   : diagramActions.DIAGRAM_POPULATE_ITEMS,
    payload: {
      items : itemsWithAssignedIDs,
      counts: furnRackCounts,
      ids
    }
  };
};
