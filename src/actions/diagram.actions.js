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
