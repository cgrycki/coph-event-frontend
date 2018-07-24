/**
 * Room actions
 */
import { roomActions } from '../constants/actionTypes';
//import * as rp from 'request-promise';


/**
 * Makes a HTTP request to our API server to retrieve rooms via GET
 */
export const fetchRooms = () => {
  let uri     = process.env.REACT_APP_REDIRECT_URI + 'rooms';
  let options = { mode: 'no-cors', method: 'GET' };
  let request = fetch(uri, options);
  
  return {
    type   : roomActions.FETCH_ROOMS,
    payload: request
  };
}


/**
 * Tells application that we have successfully recieved our rooms data
 * @param {list} rooms List of objects from our API
 */
export const fetchRoomsSuccess = (rooms) => ({
  type: roomActions.FETCH_ROOMS_SUCCESS,
  payload: rooms
})


/**
 * Notifies application of unsuccessful room call.
 * @param {error} error Error returned from our API
 */
export const fetchRoomsFailure = (error) => ({
  type: roomActions.FETCH_ROOMS_FAILURE,
  error: error
})