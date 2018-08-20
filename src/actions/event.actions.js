/**
 * Action creators for our events
 */
import * as rp          from 'request-promise';
import FormData         from 'form-data';
import { eventActions } from '../constants/actionTypes';
const URI               = process.env.REACT_APP_REDIRECT_URI;


/** Reuasable action create for intiating REST calls involving events. */
export const fetchEventLoading = () => ({
  type: eventActions.EVENT_LOADING
})

/** Reusable action for REST call failures involving events. */
export const fetchEventFailure = (error) => ({
  type: eventActions.EVENT_ERROR,
  payload: error
})

/** Notify store that we've successfully fetched an event from server */
export const fetchEventSuccess = (response) => ({
  type: eventActions.GET_EVENT_SUCCESS,
  payload: response
})

/** Notify store we've loaded a list of events from the server */
export const fetchEventsSuccess = (response) => ({
  type: eventActions.GET_EVENTS_SUCCESS,
  payload: response
})

/** Notify store of a successful event deletion */
export const deleteEventSuccess = (response) => ({
  type   : eventActions.DELETE_EVENT_SUCCESS,
  payload: response
})

/** Notify store of a successful event PATCH */
export const patchEventSuccess = (response) => ({
  type   : eventActions.PATCH_EVENT_SUCCESS,
  payload: response
})


/**
 * GET call our API to retrieve information on an single event
 */
export function getEvent(package_id) {
  return (dispatch) => {
    // Notify application we're making a request
    dispatch(fetchEventLoading());

    // Set up options for the API request
    let uri = `${URI}/events/${package_id}`;
    let options = {
      method         : 'GET',
      json           : true,
      withCredentials: true
    };

    // Make the call, and resolve the promise
    rp(uri, options)
      .then(data => dispatch(fetchEventSuccess(data)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}


/**
 * Returns a list of events from our API
 * @param {int} n Number of events to return
 * @param {*} start Start number of range
 * @param {*} end End number of range
 */
export function getEvents() {
  return (dispatch) => {
    // Notify application we're making a request
    dispatch(fetchEventLoading());

    // URI + options for API call
    let uri = `${URI}/events/my`;
    let options = {
      method         : 'GET',
      json           : true,
      withCredentials: true
    };

    // Resolve the promise
    rp(uri, options)
      .then(data => dispatch(fetchEventsSuccess(data)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}


// TO DO
export function postOrPatchEvent(eventInfo, method) {
  return (dispatch) => {
    // Create a form containing our event info
    let form_submission = new FormData();
    for (var key in eventInfo) form_submission.append(key, eventInfo[key]);
    
    // Notify application we're making a request
    dispatch(fetchEventLoading());

    // URI + options for API call
    const uri = (method === 'POST') ?
      `${URI}/events` : `${URI}/events/${eventInfo.package_id}`;

    let options = {
      method         : method,
      withCredentials: true,
      body           : form_submission
    };

    // Resolve the promise
    rp(uri, options)
      .then(res => res.json())
      .then(data => dispatch(fetchEventsSuccess(data)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}


export function deleteEvent(package_id) {
  return (dispatch) => {
    dispatch(fetchEventLoading());

    let uri = `${URI}/events/${package_id}`;
    let options = {
      method         : 'DELETE',
      uri            : uri,
      withCredentials: true,
      json           : true
    };

    rp(options)
      .then(res => dispatch(deleteEventSuccess(res)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}