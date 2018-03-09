/* Actions to increment an ID by type. */
import { idActions } from '../constants/actionTypes';

export const incrementId = (furn_type, value) => ({
  type: idActions.INC_FURN_ID,
  furn_type: furn_type,
  value: value
});