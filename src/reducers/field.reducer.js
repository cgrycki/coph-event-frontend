/**
 * Field Reducers 
 */
import initialStore         from '../store/initialStore';
import { fieldActions }     from '../constants/actionTypes';
import BusinessRequirements from '../utils/BusinessRequirements';


// Create the shape of our store to match reducers
const initialFieldStore = { ...initialStore.fields };

// Create a validation class
const businessReqs = new BusinessRequirements();

/**
 * Reducer to handle changes to our fields.
 * @param {object} state Our applications field state
 * @param {object} action Object, dispatched from field.actions.js
 */
export const fieldReducer = (state=initialFieldStore, action) => {
  // Gather variables from our action
  let { type, field, value } = action;

  switch (type) {
    case fieldActions.UPDATE_FIELD:
      // Create the new states information
      const new_info = { ...state.info, [field]: value };
      
      // Validate information
      const new_errors = businessReqs.validate(new_info, field, value);

      return { 
        ...state, 
        info: new_info,
        errors: new_errors
      };

    case fieldActions.RESET_FIELD:
      return { 
        ...state, 
        info: {...state.info, [field]: initialFieldStore.info[field] },
        errors: {...state.errors, [field]: undefined }
      };

    case fieldActions.SUBMIT_FORM_LOADING:
      return {
        ...state,
        form_loading: true
      };

    case fieldActions.SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        form_loading: false,
        form_success: action.payload.message
      };

    case fieldActions.SUBMIT_FORM_ERROR:
      return {
        ...state,
        form_loading: false,
        form_error: action.payload.message
      };

    default:
      return state;
  }
}