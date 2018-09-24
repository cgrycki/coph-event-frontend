/**
 * Action creators for our fields
 */
import * as rp                  from 'request-promise';
import BusinessRequirements     from '../utils/BusinessRequirements';
import { formActions }          from '../constants/actionTypes';
import { populateEventAndPush } from './nav.actions';
import { getTimeAfterStart }    from '../utils/date.utils';

const businessReqs = new BusinessRequirements();
const URI = process.env.REACT_APP_REDIRECT_URI;


/**
 * Updates a field with user's entered information.
 * @param {string} field Key of field to update
 * @param {} value User HTML data
 */
export const updateField = (field, value) => ({
  type: formActions.UPDATE_FIELD,
  field: field,
  value: value
})


/**
 * Updates our stores errors.
 * @param {object} errors Object containing our validation errors from BusinessReqs.
 */
const updateErrors = (errors) => ({
  type: formActions.UPDATE_ERRORS,
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
    if (field === "start_time" && getState().form.fields.end_time === "")
      dispatch(updateField("end_time", getTimeAfterStart(value)));

    // Get the store after update
    const current_state = getState();
    const info          = current_state.form.fields;
    const errors        = current_state.form.errors;
    const schedule      = current_state.schedules.schedules;

    // Validate the forms new info and update the store
    const new_errors = businessReqs.validate(info, errors, schedule, field, value);
    dispatch(updateErrors(new_errors));
  }
}

export const updateDateTimes = (date, start, end) => {
  return (dispatch) => {
    dispatch(updateField('date', date));
    dispatch(updateField('end_time', end));
    dispatch(updateForm('start_time', start));
  };
}


/**
 * Notifies store that we've initiated a POST request. Blocks other POSTs
 */
const submitFormLoading = () => ({
  type: formActions.SUBMIT_FORM_LOADING
})


/**
 * Notifies store our POST has been successful, and returns a message.
 * @param {*} response HTTP response from our server
 */
const submitFormSuccess = (response) => ({
  type   : formActions.SUBMIT_FORM_SUCCESS,
  payload: response
})


/**
 * Notifies our application that we've had an error when POSTing their form info.
 * @param {*} payload HTTP response with error from our server.
 */
const submitFormFailure = (payload) => ({
  type: formActions.SUBMIT_FORM_ERROR,
  payload
})


/** Notifies that we've navigated away from the submission page and can reset. */
export const submitFormReset = () => ({
  type: formActions.SUBMIT_FORM_RESET
})


/**
 * Wraps our submission actions so that we can execute from our components.
 * @param {object} info Contains our form field information
 * @param {object} furniture Contains our form furniture/editor information
 * @param {number} chairs_per_table Number of chairs per table
 * @returns {Promise}
 */
export function submitForm(info, items, chairs_per_table) {
  // Create our payload
  const body = {
    form: info,
    layout: {
      items,
      chairs_per_table
    }};

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

    return rp(options)
      .then(res => {
        // Remove dynamo keys
        delete res.event.createdAt;
        delete res.event.updatedAt;
        return res;
      })
      .then(res => {
        dispatch(submitFormSuccess(res));
        dispatch(populateEventAndPush(res));
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
  type   : formActions.POPULATE_FORM_FIELDS,
  payload: info
});


/** Resets form information to the default state. */
export const clearFieldInfo = () => ({
  type: formActions.CLEAR_FORM_FIELDS
})