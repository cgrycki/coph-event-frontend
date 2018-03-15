import { initialState } from '../store/initialStore';
import { formActions } from '../constants/actionTypes';
import { combineReducers } from 'redux';

// Update form field
function updateFormReducer(state=initialState.forms.fields, action) {
  /*
   *
   */
  let { type, name, value } = action;
  switch (type) {
    case formActions.UPD_FORM:
      return {
        ...state,
        [name]: value
      };
    default:
      return state;
  }
}

function submitFormReducer(state=initialState.forms.validations, action) {
  /*
   *
   */
  switch (action.type) {
    case formActions.SUBMIT_FORM:
      console.log('button clicked!');
      return {
        ...state,
        complete: true
      };
    default:
      return state;
  }
}

const formReducer = combineReducers({
  updateFormReducer,
  submitFormReducer
})
export default formReducer