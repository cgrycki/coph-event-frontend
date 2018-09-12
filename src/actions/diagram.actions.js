/**
 * diagram Actions
 */
import { diagramActions } from '../constants/actionTypes';


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
 * @param {*} key Property key attribute
 * @param {*} value Value to change
 */
export const updateEditor = fields => ({
  type   : diagramActions.DIAGRAM_UPDATE_EDITOR,
  payload: fields
});


/** Counts the number of objects with attribute 'furn' and returns an object */
function countFurniture(items) {
  let counts = {};
  items.forEach(item => {
    if (!(item.furn in counts)) counts[item.furn] = 1;
    else counts[item.furn] += 1;
  });
  return counts;
}

/** Assigns furnitureIDs so we can not have ID collisions after loading from DB. */
function assignFurnitureIDs(items, counts) {
  // Create a copy because we'll be 'destroying' counter obj while decrementing
  let copyCounts = Object.assign({}, counts);

  const reassignedIDs = items.map(item => {
    // Decrement counter
    copyCounts[item.furn] -= 1;
    const newID = item.furn + copyCounts[item.furn];
    item.id = newID;
    return item;
  });

  return reassignedIDs;
}

function countAndAssignFurnitureItems(items) {
  const counts        = countFurniture(items);
  const reassignedIDs = assignFurnitureIDs(items, counts);

  return { items: reassignedIDs, counts };
}

export const populateEditor = (savedItems) => {
  const { items, counts } = countAndAssignFurnitureItems(savedItems);
  const ids               = Object.assign({}, counts);

  return {
    type   : diagramActions.DIAGRAM_POPULATE_ITEMS,
    payload: { items, counts, ids }
  };
};

/** ~~Mathemagic~~ */
export function computeFurnitureCounts(counts, chairs_per_table) {
  // Returns the min. amount of racks needed to accomodate n items.
  const getRackCnt  = (itemCnt, rackCapac) => {
    const quotient  = Math.floor(itemCnt / rackCapac);
    const remainder = itemCnt % rackCapac;
    
    // If we have any remainders, add a rack to the count
    const rackCnt   = (remainder > 0) ? quotient + 1 : quotient;
    return rackCnt;
  }

  // Number of chairs: # free chairs + table chairs; racks hold 48 chairs
  const chair       = counts.chair + (chairs_per_table * counts.circle);
  const chair_racks = getRackCnt(chair, 48);

  // Circle tables: racks hold 6
  const circle = counts.circle;
  const circle_racks = getRackCnt(circle, 6);

  // Rectangular tables: racks hold 6
  const rect = counts.rect;
  const rect_racks = getRackCnt(rect, 6);

  // Cocktail-height tables: 
  const cocktail = counts.rect;
  const cocktail_racks = getRackCnt(cocktail, 10);

  // Display boards have no racks
  const display = counts.display;

  // Same with trash cans
  const trash = counts.trash;

  return {
    chair,
    chair_racks,
    circle,
    circle_racks,
    rect,
    rect_racks,
    cocktail,
    cocktail_racks,
    display,
    trash
  };
}