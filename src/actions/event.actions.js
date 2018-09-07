/**
 * Action creators for our events
 */
import * as rp          from 'request-promise';
import {push}           from 'connected-react-router/lib/actions';
import {parseDynamo}    from '../utils/date.utils';
import {eventActions}   from '../constants/actionTypes';
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

/** Reusable action to reset REST status */
export const fetchEventReset = () => ({
  type: eventActions.EVENT_RESET
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

/** Sets our store attribute controlling fetch behavior on Event Page load. */
export const setEventFetch = (shouldFetch) => ({
  type: eventActions.SET_FETCH_EVENT,
  payload: shouldFetch
});


/**
 * GET call our API to retrieve information on an single event
 * @param {number} package_id HashKey of event to GET from API. 
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
      .then(() => dispatch(setEventFetch(false)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}


/**
 * Dispatches the delete event sequence.
 * @param {number} package_id Primary key of an event
 */
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

/**
 * Dispatches the delete event FOR WORKFLOW ONLY.
 * @param {number} package_id Primary key of an event
 */
export function deleteWorkflowEvent(package_id) {
  return (dispatch) => {
    dispatch(fetchEventLoading());

    let uri = `${URI}/utils/workflow/${package_id}`;
    let options = {
      method         : 'DELETE',
      uri            : uri,
      withCredentials: true,
      json           : true
    };

    rp(options)
      .then(res => (res.error) ?
        dispatch(fetchEventFailure(res)) :
        dispatch(deleteEventSuccess(res)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}

/**
 * Dispatches the delete event FOR WORKFLOW ONLY.
 * @param {number} package_id Primary key of an event
 */
export function deleteDynamoEvent(package_id) {
  return (dispatch) => {
    dispatch(fetchEventLoading());

    let uri = `${URI}/utils/dynamo/${package_id}`;
    let options = {
      method         : 'DELETE',
      uri            : uri,
      withCredentials: true,
      json           : true
    };

    rp(options)
      .then(res => (res.error) ?
        dispatch(fetchEventFailure(res)) :
        dispatch(deleteEventSuccess(res)))
      .catch(err => dispatch(fetchEventFailure(err)));
  }
}

/** Populate event from our events list. */
export const populateEventInfo = (event, permissions, items) => ({
  type: eventActions.POPULATE_EVENT_INFO,
  payload: { event, permissions, items }
});

/** 
 * Populates an event and then dispatches navigation to the event page for viewing.
 * @param {Object} item Event and permissions object from our store's events [].
 * @param [item.evt] {Object} - Event information submitted by user.
 * @param [item.permissions] {Object} - Event permissions from Workflow. 
 */
export const populateEventAndPush = ({event, permissions, items=[]}) => (dispatch) => {
  const formattedInfo = parseDynamo(event);                       // Format Dynamo object
  dispatch(populateEventInfo(formattedInfo, permissions, items)); // Populate Event Page info
  dispatch(fetchEventReset());                                    // Reset event page loading+error+success
  dispatch(setEventFetch(false));                                 // Disable retrieving event because we've loaded it
  dispatch(push(`/event/${event.package_id}`));                     // Route to the event so user can view
}
