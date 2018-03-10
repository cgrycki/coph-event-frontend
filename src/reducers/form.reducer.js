import { initialState } from '../store/initialStore';
import { formActions } from '../constants/actionTypes';

export default function(state=initialState.forms, action) {
  /*
   * @documentation...
   * @description Updates a form field.
   */
  let { name, value } = action;
  value = (name === 'chairsPerTable') ? parseInt(value, 10) : value;

  switch (action.type) {
    case formActions.UPD_FORM:
      return {
        ...state,
        [name]: value
      };
    default:
      return state
  }
}