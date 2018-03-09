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
  UPD_FORM          : 'UPD_FORM'
}

/* Furniture IDs */
export const idActions= {
  // Only increment to preserve unique IDs after furniture deletion
  INC_FURN_ID       : 'INC_FURN_ID'
}

/* Furniture Items */
export const itemActions= {
  ADD_FURN_ITEM     : 'ADD_FURN_ITEM',
  RM_FURN_ITEM      : 'RM_FURN_ITEM',
  UPD_FURN_ITEM     : 'UPD_FURN_ITEM'
}

/* Editor */
export const editorActions= {
  // Props
  UPD_EDITOR_DIM    : 'UPD_EDITOR_DIM',
  UPD_EDITOR_XY     : 'UPD_EDITOR_XY',
  UPD_EDITOR_SCALE  : 'UPD_EDITOR_SCALE',
  UPD_EDITOR_OFFSET : 'UPD_EDITOR_OFFSET',
  UPD_EDITOR_REF    : 'UPD_EDITOR_REF',
  UPD_EDITOR_URI    : 'UPD_EDITOR_URI',
  // Interactions
  UPD_EDITOR_SEL    : 'UPD_EDITOR_SEL',
  UPD_EDITOR_FOCUS  : 'UPD_EDITOR_FOCUS',
}


/* Calculated variables */
export const calcActions= {
  UPD_CALC          : 'UPD_CALC'
}

/* Application events */
export const appActions= {
  SUBMIT_FORM       : 'SUBMIT_FORM'
}
