/**
 * Field Reducers 
 */
import initialStore from '../store/initialStore';
import { fieldActions } from '../constants/actionTypes';


// Create the shape of our store to match reducers
const initialFieldStore = {
  info  : initialStore.fields.info,
  errors: initialStore.fields.errors
};


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
      return { 
        ...state, 
        info: {...state.info, [field]: value }
      };

    case fieldActions.RESET_FIELD:
      return { 
        ...state, 
        info: {...state.info, [field]: initialFieldStore.info[field] },
        errors: {...state.errors, [field]: undefined }
      };

    default:
      return state;
  }
}