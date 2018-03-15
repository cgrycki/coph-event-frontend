/* Actions to update our input form. */
import { itemActions } from '../constants/actionTypes';

export const addFurnItem = ({x, y}) => ({
  type: itemActions.ADD_FURN_ITEM,
  x: x,
  y: y
});

export const updateFurnItem = ({furn_type, item_id, x, y}) => ({
  type: itemActions.UPD_FURN_ITEM,
  furn_type: furn_type,
  item_id: item_id,
  x: x,
  y: y
});

export const removeFurnItem = ({item_id}) => ({
  type: itemActions.RM_FURN_ITEM,
  item_id: item_id
});

export const updateFurnFocus = ({item_id}) => ({
  type: itemActions.UPD_FURN_FOCUS,
  item_id: item_id
});