/* Actions to trigger an update to our calculated variables. */
import { calcActions } from '../constants/actionTypes';

export const updatedCalculated = () => ({
  type: calcActions.UPD_CALC
});