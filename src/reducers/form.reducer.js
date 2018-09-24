/**
 * Field Reducers 
 */
import initialStore   from '../store/initialStore';
import { 
  formActions,
  appActions
}                     from '../constants/actionTypes';


// Create the shape of our store to match reducers
const initialFormStore = { ...initialStore.form };


/**
 * Reducer to handle changes to our fields.
 * @param {object} state Our applications field state
 * @param {object} action Object, dispatched from field.actions.js
 */
export const formReducer = (state=initialFormStore, action) => {
  let { type, field, value } = action;

  switch (type) {
    /** Create the new state's form field information */
    case formActions.UPDATE_FIELD:
      const new_info = { ...state.fields, [field]: value };
      return { ...state, fields: new_info };
    
    /** Create the new state's form error information */
    case formActions.UPDATE_ERRORS:
      let new_errors = { ...state.errors, ...action.errors };
      return { ...state, errors: new_errors };

    /** If we've logged in correctly, set the user's email from login response */
    case appActions.LOGIN_SUCCESS:
      const { hawkid } = action.payload;
      const email_info = { ...state.fields, 'user_email': `${hawkid}@uiowa.edu` };
      return { ...state, fields: email_info };

    /** Notify application that we've submitted a POST/PATCH call to API */
    case formActions.SUBMIT_FORM_LOADING:
      return { ...state, form_loading: true };

    /** Empty our info fields sans the user email. */
    case formActions.SUBMIT_FORM_SUCCESS:
      const emptied_info = { 
        ...initialFormStore.fields, 
        user_email: state.fields.user_email
      };
      
      return {
        ...state,
        fields      : emptied_info,
        form_loading: false,
        form_error  : null,
        form_success: true
      };
    
    /** Error occured during a POST/PATCH call. */
    case formActions.SUBMIT_FORM_ERROR:
      return {
        ...state,
        form_loading: false,
        form_error  : action.payload.message,
        form_success: false
      };
    
    /** Reset REST state for submitting form information. */
    case formActions.SUBMIT_FORM_RESET:
      return {
        ...state,
        form_loading: false,
        form_error  : null,
        form_success: false
      };

    /** Users can edit events after they've been created and before they've been approved. */
    case formActions.POPULATE_FORM_FIELDS:
      const hydrated_info = { 
        ...initialFormStore.fields, 
        ...action.payload,
        setup_mfk: { 
          ...initialFormStore.fields.setup_mfk,
          ...action.payload.setup_mfk
        }
      };
      
      return {...state, fields: hydrated_info};

    /** Sets the form fields to their initial state. */
    case formActions.CLEAR_FORM_FIELDS:
      const cleared_info = {
        ...initialFormStore.fields,
        user_email: state.fields.user_email,
        setup_mfk: { ...initialFormStore.fields.setup_mfk }
      };

      return { ...state, fields: cleared_info };
    
      default:
      return state;
  }
}