import { initialState } from '../store/initialStore';
import { formActions } from '../constants/actionTypes';
import { combineReducers } from 'redux';

const initialFormState = {
  fields: initialState.forms.fields,
  saveStatus: initialState.forms.saveStatus
};

// Update form field
function updateFormReducer(state=initialFormState, action) {
  /*
   *
   */
  let { type, name, value } = action;
  switch (type) {
    case formActions.UPD_FORM:
      return {
        ...state,
        fields: {
          ...state.fields,
          [name]: value
        }
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
  updateFormReducer
})
export default formReducer