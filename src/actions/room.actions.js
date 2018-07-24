/**
 * Room actions
 */
import { roomActions } from '../constants/actionTypes';
import * as rp from 'request-promise';

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
  type: roomActions.FETCH_ROOMS_SUCCESS,
  payload: response,
})


/**
 * Notifies application of unsuccessful room call.
 * @param {error} error Error returned from our API call
 */
const fetchRoomsFailure = (error) => ({
  type: roomActions.FETCH_ROOMS_FAILURE,
  payload: error
})


/**
 * Wraps all of our actions in a function so that we may execute an async action
 */
export default function fetchRooms() {
  return (dispatch) => {
    // Notify the store that we're initiating a API request
    dispatch(fetchRoomsLoading());

    // Set up options for API call
    let uri     = process.env.REACT_APP_REDIRECT_URI + 'rooms';
    let options = { method: 'GET' };

    rp(uri, options)
      .then(res => res.json())
      .then(data => dispatch(fetchRoomsSuccess(data)))
      .catch(err => dispatch(fetchRoomsFailure(err)));
  };
};