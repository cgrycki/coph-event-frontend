import { initialState } from '../store/initialStore';
import { formActions } from '../constants/actionTypes';
import { combineReducers } from 'redux';

export default function(state=initialState, action) {
  /*
   * @documentation...
   * @description Updates a form field.
   */
  const { type, name, value } = action;
  console.log(action);

  switch (action.type) {
    case formActions.UPD_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          [name]: value
        }
      };
    default:
      return state
  }
}