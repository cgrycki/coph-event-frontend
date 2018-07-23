/**
 * Editor Actions
 */
import { editorActions } from '../constants/actionTypes';


/**
 * Adds an furniture item to our editor's layout. Type and ID inferred later
 * @param {float} x Item's horizontal position within layout
 * @param {float} y Item's vertical position within layout   
 */
export const addEditorItem = (x, y) => ({
  type     : editorActions.ADD_ITEM,
  x,
  y
})


/**
 * Select an item in our layout, nullifying other selections.
 * @param {string} item_id ID representing the furniture item to select.
 */
export const selectEditorItem = (item_id) => ({
  type   : editorActions.SELECT_ITEM,
  item_id
})


/**
 * Updates an furniture item in our editor's layout.
 * @param {string} furn_type Designates the updated furniture type
 * @param {string} item_id Current ID from event
 * @param {float} x Item's horizontal position within layout
 * @param {float} y Item's vertical position within layout   
 */
export const updateEditorItem = (furn_type, item_id, x, y) => ({
  type     : editorActions.UPDATE_ITEM,
  furn_type,
  item_id,
  x,
  y
})


/**
 * Removes an item from our editor.
 * @param {string} item_id ID of item we're removing
 */
export const removeEditorItem = (item_id) => ({
  type: editorActions.REMOVE_ITEM,
  item_id
})


/**
 * Updates our editor; zooming, panning, furniture type, or chairs_per_table
 * @param {*} key Property key attribute
 * @param {*} value Value to change
 */
export const updateEditor = (field, value) => ({
  type : editorActions.UPDATE_EDITOR,
  field,
  value
})