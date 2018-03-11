import { optimizedState } from '../store/initialStore';
import { formActions } from '../constants/actionTypes';
import { combineReducers } from 'redux';

// Update form field
function updateFormReducer(state=optimizedState.forms.fields, action) {
  /*
   *
   */
  let { type, name, value } = action;
  switch (type) {
    case formActions.UPD_FORM:
      console.log(state, action);
      return {
        ...state,
        [name]: value
      };
    default:
      return state;
  }
}

function updateValidationReducer(state=optimizedState.forms.validations, action) {
  /*
   *
   */
  let { actionType, name } = action;
  switch (actionType) {
    case 'UPD_VALID_STATE':
      return {
        ...state,
        [name]: true
      };
    default:
      return state;
  }
}

export default combineReducers({
  updateFormReducer,
  updateValidationReducer
})