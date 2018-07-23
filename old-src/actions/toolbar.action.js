/* Actions to update input from our Editor's toolbar */
import { toolbarActions } from '../constants/actionTypes';

export const updateSelectedFurnType = (selectedFurnType) => ({
  type: toolbarActions.SET_SELECT_FURN,
  selectedFurnType: selectedFurnType
});

export const updateChairsPerTable = (chairsPerTable) => ({
  type: toolbarActions.SET_NUM_CHAIRS,
  chairsPerTable: chairsPerTable
});