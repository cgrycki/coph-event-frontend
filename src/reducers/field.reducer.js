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
  let { type, field, value } = action;

  switch (type) {
    /** Create the new state's form field information */
    case fieldActions.UPDATE_FIELD:
      const new_info = { ...state.info, [field]: value };
      return { ...state, info: new_info };
    
    /** Create the new state's form error information */
    case fieldActions.UPDATE_ERRORS:
      let new_errors = { ...state.errors, ...action.errors };
      return { ...state, errors: new_errors };

    /** If we've logged in correctly, set the user's email from login response */
    case appActions.LOGIN_SUCCESS:
      const { hawkid } = action.payload;
      const email_info = { ...state.info, 'user_email': `${hawkid}@uiowa.edu` };
      return { ...state, info: email_info };

    /** Notify application that we've submitted a POST/PATCH call to API */
    case fieldActions.SUBMIT_FORM_LOADING:
      return { ...state, form_loading: true };

    /** Empty our info fields sans the user email. */
    case fieldActions.SUBMIT_FORM_SUCCESS:
      const emptied_info = { 
        ...initialFieldStore.info, 
        user_email: state.info.user_email
      };
      
      return {
        ...state,
        info        : emptied_info,
        form_loading: false,
        form_error  : null,
        form_success: true
      };
    
    /** Error occured during a POST/PATCH call. */
    case fieldActions.SUBMIT_FORM_ERROR:
      return {
        ...state,
        form_loading: false,
        form_error  : action.payload.message,
        form_success: false
      };
    
    /** Reset REST state for submitting form information. */
    case fieldActions.SUBMIT_FORM_RESET:
      return {
        ...state,
        form_loading: false,
        form_error  : null,
        form_success: false
      };

    /** Users can edit events after they've been created and before they've been approved. */
    case fieldActions.POPULATE_FIELDS:
      const hydrated_info = { 
        ...state.info, 
        ...action.payload,
        setup_mfk: { 
          ...state.info.setup_mfk,
          ...action.payload.setup_mfk
        }
      };
      return {
        ...state, 
        info: hydrated_info,
        form_loading: false,
        form_error: null,
        form_success: false
      };

    default:
      return state;
  }
}