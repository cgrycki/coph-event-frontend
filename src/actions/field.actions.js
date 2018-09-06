/**
 * Action creators for our fields
 */
import { push }             from 'connected-react-router/lib/actions';
import { fieldActions }     from '../constants/actionTypes';
import * as rp              from 'request-promise';
import FormData             from 'form-data';
import BusinessRequirements from '../utils/BusinessRequirements';
import { 
  getTimeAfterStart,
  parseDynamo
} from '../utils/date.utils';

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
  type: fieldActions.UPDATE_ERRORS,
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
 * @param {*} response HTTP response from our server
 */
export const submitFormSuccess = (response) => ({
  type   : fieldActions.SUBMIT_FORM_SUCCESS,
  payload: response
})


/**
 * Notifies our application that we've had an error when POSTing their form info.
 * @param {*} payload HTTP response with error from our server.
 */
export const submitFormFailure = (payload) => ({
  type: fieldActions.SUBMIT_FORM_ERROR,
  payload
})


/** Notifies that we've navigated away from the submission page and can reset. */
export const submitFormReset = () => ({
  type: fieldActions.SUBMIT_FORM_RESET
})


/**
 * Wraps our submission actions so that we can execute from our components.
 * @param {object} info Contains our form field information
 * @param {object} furniture Contains our form furniture/editor information
 * @returns {Promise}
 */
export function submitForm(info, items) {
  // Create our payload
  const body = { form: info, layout: items };

  // Assign REST method + URI depending on form submission status
  const method = (info.package_id) ? 'PATCH' : 'POST';
  const uri    = `${URI}/events/${(info.package_id) ? info.package_id : ''}`;

  // Create options for REST call
  const options = {
    method         : method,
    uri            : uri,
    withCredentials: true,
    json           : true,
    body           : body
  };

  return (dispatch) => {
    dispatch(submitFormLoading());

    rp(options)
      .then(res => dispatch(submitFormSuccess(res)))
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


/**
 * Populates field information for an event and then dispatches a routing action.
 */
export const populateFormAndPush = (info) => (dispatch) => {
  const formattedInfo = parseDynamo(info);    // Format Dynamo object
  dispatch(populateFieldInfo(formattedInfo)); // Populate form infomation
  dispatch(submitFormReset());                // Reset the form submission loading+error+success
  dispatch(push("/form/user"));               // Route to form so user can edit
}
