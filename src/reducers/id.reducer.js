import { initialState } from '../store/initialStore';
import { idActions } from '../constants/actionTypes';

export default function(state=initialState.furn_ids, action) {
  /*
   *
   */
  const { value } = action;

  switch (action.type) {
    case idActions.INC_FURN_ID:
      return {
        ...state,
        [value]: state.furn_ids[value] + 1
      };
    default:
      return state
  }
}