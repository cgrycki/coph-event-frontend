/**
 * Action creators for our events
 */
import * as rp from 'request-promise';
import FormData from 'form-data';
import { eventActions } from '../constants/actionTypes';


// Base URI for our API
const URI = process.env.REACT_APP_REDIRECT_URI;


export const fetchEventLoading = () => ({
  type: eventActions.EVENT_LOADING
})

export const fetchEventSucess = (response) => ({
  type: eventActions.EVENT_SUCESS,
  payload: response
})

export const fetchEventsSucess = (response) => ({
  type: eventActions.EVENTS_SUCESS,
  payload: response
})

export const fetchEventFailure = (error) => ({
  type: eventActions.EVENT_ERROR,
  payload: error
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
      .then(data => dispatch(fetchEventSucess(data)))
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
      .then(data => dispatch(fetchEventsSucess(data)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}


/**
 * Posts an event to our API
 * @param {object} eventInfo Object containing our store's validated field.info data
 */
export function postEvents(eventInfo) {
  return (dispatch) => {
    // Create a form containing our event info
    let form_submission = new FormData();
    for (var key in eventInfo) form_submission.append(key, eventInfo[key]);
    
    // Notify application we're making a request
    dispatch(fetchEventLoading());

    // URI + options for API call
    let uri = `${URI}/events`;
    let options = {
      method: 'POST',
      withCredentials: true,
      body: form_submission
    };

    // Resolve the promise
    rp(uri, options)
      .then(res => res.json())
      .then(data => dispatch(fetchEventsSucess(data)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}

// TO DO
export function patchEvent(eventInfo) {
  return (dispatch) => {
    // Get info

    // Create form

    // Notify application of HTTP request

    // URI + options

    // Resolve request
  }
}


// TO DO
export function deleteEvent(package_id) {
  return (dispatch) => {
    dispatch(fetchEventLoading());

    let uri = `${URI}/workflow/${package_id}`;
    let options = {
      method         : 'DELETE',
      uri            : uri,
      withCredentials: true,
      json           : true
    };

    rp(options)
      .then(res => console.log(res))
      .then(res => {
        if (res.error) dispatch(fetchEventFailure(res))
        else dispatch(fetchEventSucess(res));
      })
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}