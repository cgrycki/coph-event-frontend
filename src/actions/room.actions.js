/**
 * Room actions
 */
import { roomActions } from '../constants/actionTypes';
import * as rp from 'request-promise';
import { join } from 'url';

const URI = process.env.REACT_APP_REDIRECT_URI;

/**
 * Notifies our application that we're loading an API
 */
const fetchRoomsLoading = () => ({
  type: roomActions.FETCH_ROOMS_LOADING
})


/**
 * Tells application that we have successfully recieved our rooms data
 * @param {*} response HTTP response containing List of objects from our API
 */
const fetchRoomsSuccess = (response) => ({
  type   : roomActions.FETCH_ROOMS_SUCCESS,
  payload: response,
})


/**
 * Notifies application of unsuccessful room call.
 * @param {error} error Error returned from our API call
 */
const fetchRoomsFailure = (error) => ({
  type   : roomActions.FETCH_ROOMS_FAILURE,
  payload: error
})


/**
 * Wraps all of our actions in a function so that we may execute an async action
 */
export function fetchRooms() {
  return (dispatch) => {
    // Notify the store that we're initiating a API request
    dispatch(fetchRoomsLoading());

    // Set up options for API call
    let uri     = `${URI}/rooms`;
    let options = { method: 'GET', withCredentials: true };

    rp(uri, options)
      .then(res => JSON.parse(res))
      .then(data => dispatch(fetchRoomsSuccess(data)))
      .catch(err => dispatch(fetchRoomsFailure(err)));
  };
};


/**
 * Notifies our application that we're loading an API for room schedules
 */
const fetchScheduleLoading = () => ({
  type: roomActions.FETCH_SCHEDULE_LOADING
})


const fetchScheduleSuccess = (response) => ({
  type   : roomActions.FETCH_SCHEDULE_SUCCESS,
  payload: response
})


/**
 * Notifies application of unsuccessful room call.
 * @param {error} error Error returned from our API call
 */
const fetchScheduleFailure = (error) => ({
  type   : roomActions.FETCH_SCHEDULE_FAILURE,
  payload: error
})

/**
 * Wraps the loading/success/error state dispatches for async room schedule fetches.
 */
export function fetchRoomSchedule(room_number, date) {
  return (dispatch) => {
    // Notify the store we're making an async call
    dispatch(fetchScheduleLoading());

    // Create the URL for our API call
    let uri = `${URI}/rooms/${room_number}/${date}`;
    let options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    };

    rp(uri, options)
      .then(res => JSON.parse(res))
      .then(data => dispatch(fetchScheduleSuccess(data)))
      .catch(err => dispatch(fetchScheduleFailure(err)));
  }
}