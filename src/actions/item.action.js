/* Actions to update our input form. */
import { itemActions } from '../constants/actionTypes';

export const addFurnItem = (furn_type, x, y) => ({
  type: itemActions.ADD_FURN_ITEM,
  furn_type: furn_type,
  x: x,
  y: x
});

export const updateFurnItem = (furn_type, item_id, x, y) => ({
  type: itemActions.UPD_FURN_ITEM,
  furn_type: furn_type,
  item_id: item_id,
  x: x,
  y: y
  //focused: focused
});

export const removeFurnItem = (furn_type, item_id) => ({
  type: itemActions.RM_FURN_ITEM,
  furn_type: furn_type,
  item_id: item_id
});