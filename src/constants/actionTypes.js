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
  UPD_EDITOR_PROP: 'UPD_EDITOR_PROP',
  UPD_EDITOR_REF : 'UPD_EDITOR_REF',
  UPD_EDITOR_URI : 'UPD_EDITOR_URI'
}

/* Furniture Items */
export const itemActions= {
  ADD_FURN_ITEM: 'ADD_FURN_ITEM',
  RM_FURN_ITEM : 'RM_FURN_ITEM',
  UPD_FURN_ITEM: 'UPD_FURN_ITEM',
  UPD_FURN_FOCUS: 'UPD_FURN_FOCUS'
}

/* Toolbar */
export const toolbarActions = {
  SET_NUM_CHAIRS: 'SET_NUM_CHAIRS',
  SET_SELECT_FURN: 'SET_SELECT_FURN'
}
