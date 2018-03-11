/*
 * Action Types
 * Key for reading this file:
 *  -ADD= 'add' 
 *  -UPD= 'update'
 *  -RM= 'remove'
 *  -FURN= 'furniture'
 *  -CALC= 'calculated'
 */

/* Forms */
export const formActions= {
  UPD_FORM   : 'UPD_FORM',
  SUBMIT_FORM: 'SUBMIT_FORM'
}

/* Editor */
export const editorActions= {
  // Props
  UPD_EDITOR_PROP: 'UPD_EDITOR_PROP',
  UPD_EDITOR_REF : 'UPD_EDITOR_REF',
  UPD_EDITOR_URI : 'UPD_EDITOR_URI',
  // Interactions
  UPD_EDITOR_FOCUS: 'UPD_EDITOR_FOCUS',
}

/* Furniture Items */
export const itemActions= {
  ADD_FURN_ITEM: 'ADD_FURN_ITEM',
  RM_FURN_ITEM : 'RM_FURN_ITEM',
  UPD_FURN_ITEM: 'UPD_FURN_ITEM'
}

/* Toolbar */
export const toolbarActions = {
  SET_NUM_CHAIRS: 'SET_NUM_CHAIRS',
  SET_SELECT_FURN: 'SET_SELECT_FURN'
}

/* Calculated variables */
export const calcActions= {
  UPD_CALC: 'UPD_CALC'
}
