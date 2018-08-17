/**
 * Action creators for our fields
 */
import { fieldActions }     from '../constants/actionTypes';
import FormData             from 'form-data';
import BusinessRequirements from '../utils/BusinessRequirements';
import { getTimeAfterStart } from '../utils/date.utils';

const businessReqs = new BusinessRequirements();
const URI = process.env.REACT_APP_REDIRECT_URI;


/**
 * Updates a field with user's entered information.
 * @param {string} field Key of field to update
 * @param {} value User HTML data
 */
export const updateField = (field, value) => ({
  type: fieldActions.UPDATE_FIELD,
  field: field,
  value: value
})


/**
 * Updates our stores errors.
 * @param {object} errors Object containing our validation errors from BusinessReqs.
 */
const updateErrors = (errors) => ({
  type: 'UPDATE_ERRORS',
  errors
});


/**
 * Updates our form field AND validates current state.
 * @param {string} field - Field key to update in our form info
 * @param {any} value - Value of user input
 */
export const updateForm = (field, value) => {
  return (dispatch, getState) => {
    // Dispatch the field update if and only if field/value are defined.
    // After loading room schedule we dispatch an update to 
    // validate the new schedule doesn't conflict with prior input.
    if (field !== undefined) dispatch(updateField(field, value));

    // Set end_time 'automagically' if not already entered
    if (field === "start_time" && getState().fields.info.end_time === "")
      dispatch(updateField("end_time", getTimeAfterStart(value)));

    // Get the store after update
    const current_state = getState();
    const info          = current_state.fields.info;
    const errors        = current_state.fields.errors;
    const schedule      = current_state.rooms.room_schedule;

    // Validate the forms new info and update the store
    const new_errors = businessReqs.validate(info, errors, schedule, field, value);
    dispatch(updateErrors(new_errors));
  }
}


/**
 * Notifies store that we've initiated a POST request. Blocks other POSTs
 */
export const submitFormLoading = () => ({
  type: fieldActions.SUBMIT_FORM_LOADING
})


/**
 * Notifies store our POST has been successful, and returns a message.
 * @param {*} payload HTTP Response from our server
 */
export const submitFormSuccess = (payload) => ({
  type: fieldActions.SUBMIT_FORM_SUCCESS,
  payload
})


/**
 * Notifies our application that we've had an error when POSTing their form info.
 * @param {*} payload HTTP response with error from our server.
 */
export const submitFormFailure = (payload) => ({
  type: fieldActions.SUBMIT_FORM_ERROR,
  payload
})


/**
 * Wraps our submission actions so that we can execute from our components.
 */
export function submitForm(info) {
  return (dispatch) => {
    
    // Notify store we're submitting
    dispatch(submitFormLoading());

    // Create a new form to submit, and add each field key/value to it.
    let form = new FormData();
    Object.keys(info).forEach(key => { form.append(key, info[key]); });

    // Set up URI and options for POST API call.
    let uri = `${URI}/events`;
    let options = {
      method     : 'POST',
      credentials: 'include',
      body       : form
    };

    // Make the POST call
    fetch(uri, options)
      .then(res => {
        // Check errror from our server
        if (res.error || res.status !== 201) dispatch(submitFormFailure(res));
        else dispatch(submitFormSuccess(res));
      })
      .catch(err => dispatch(submitFormFailure(err)));
  }
}


/**
 * Populates our fields from an already created event.
 * @param {Object} info - Event information
 * @returns {Object} Action for redux
 */
export const populateFieldInfo = (info) => ({
  type   : fieldActions.POPULATE_FIELDS,
  payload: info
});