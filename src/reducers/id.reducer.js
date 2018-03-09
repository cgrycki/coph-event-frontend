import { initialState } from '../store/initialStore';
import { idActions } from '../constants/actionTypes';

export default function(state=initialState, action) {
  /*
   *
   */
  const {type, value } = action;

  switch (action.type) {
    case idActions.INC_FURN_ID:
      return {
        ...state,
        furn_ids: {
          ...state.furn_ids,
          [value]: state.furn_ids[value] + 1
        }
      };
    default:
      return state
  }
}