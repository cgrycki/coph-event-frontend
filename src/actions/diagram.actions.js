/**
 * diagram Actions
 */
import {diagramActions} from '../constants/actionTypes';


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
})


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
export const removeEditorItem = id => ({
  type: diagramActions.DIAGRAM_REMOVE_ITEM,
  id
})


/**
 * Updates our editor; zooming, panning, furniture type, or chairs_per_table
 * @param {*} key Property key attribute
 * @param {*} value Value to change
 */
export const updateEditor = fields => ({
  type   : diagramActions.DIAGRAM_UPDATE_EDITOR,
  payload: fields
});


// Ideally we'd reset the item IDs and create a count here
export const populateEditor = items => ({
  type   : diagramActions.DIAGRAM_POPULATE_ITEMS,
  payload: items
})



export function computeFurnitureCounts(items) {
  // Get a list of unique furn types from furniture items
  const furn_types = [...new Set(items.map(item => item.furn))];

  // Reduce array into an object, with furn type as a key for the count of items
  const furn_counts = furn_types.reduce((countObj, furn) => {
    countObj[furn] = items.filter(item => item.furn === furn).length;
    return countObj;
  }, {});


  return furn_counts;
}

function countFurnitureItems(items) {
  let new_id;
  let counts = {};

  // Assign new id and count furn types in one go
  items.forEach(item => {
    let {furn} = item;

    // Check inclusion
    if (!(furn in counts)) {
      new_id = furn + 0;
      item.id = new_id;
      counts[furn] = 1;
    } else {
      new_id = furn + counts[furn];
      item.id = new_id;
      counts[furn] += 1
    };
  });

  return { items, counts };
}


