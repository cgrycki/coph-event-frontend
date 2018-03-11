/* Actions to trigger an update to our calculated variables. */
import { hudActions } from '../constants/actionTypes';

export const updateHUD = () => ({
  type: hudActions.UPD_HUD
});