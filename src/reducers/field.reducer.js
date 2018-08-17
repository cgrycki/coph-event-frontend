/**
 * Field Reducers 
 */
import initialStore         from '../store/initialStore';
import { 
  fieldActions,
  appActions
}     from '../constants/actionTypes';


// Create the shape of our store to match reducers
const initialFieldStore = { ...initialStore.fields };


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
      // Create the new state's form field information
      const new_info = { ...state.info, [field]: value };
      return { ...state, info: new_info };
    
    case fieldActions.UPDATE_ERRORS:
      // Create the new state's form error information
      let new_errors = { ...state.errors, ...action.errors };
      return { ...state, errors: new_errors };

    case appActions.LOGIN_SUCESS:
      // If we've logged in correctly, set the user email from login response
      const { hawkid } = action.payload;
      const email_info = { ...state.info, 'user_email': `${hawkid}@uiowa.edu` };
      return { ...state, info: email_info };


    case fieldActions.SUBMIT_FORM_LOADING:
      return { ...state, form_loading: true };

    case fieldActions.SUBMIT_FORM_SUCCESS:
      // Empty our info fields sans the user email, which remains the same.
      const emptied_info = { 
        ...initialFieldStore.info, 
        user_email: state.info.user_email
      };
      
      return {
        ...state,
        info        : emptied_info,
        form_loading: false,
        form_error  : null,
        form_success: action.payload.message
      };

    case fieldActions.SUBMIT_FORM_ERROR:
      return {
        ...state,
        form_loading: false,
        form_error: action.payload.message
      };

    case fieldActions.POPULATE_FIELDS:
      // Users can edit events after they've been created and before they've been approved.
      const hydrated_info = { ...initialStore.info, ...action.payload };
      return { ...state, info: hydrated_info };

    default:
      return state;
  }
}