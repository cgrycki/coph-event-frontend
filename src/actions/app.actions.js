/**
 * Application actions
 */
import { appActions } from '../constants/actionTypes';
import * as rp from 'request-promise';

const URI = process.env.REACT_APP_REDIRECT_URI;

 
/**
 * Notifies our application we're attempting to validate logged-in status
 */
const fetchLoginLoading = () => ({
  type: appActions.LOGIN_LOADING
})


/**
 * Sends an action with the successful response of the API call
 * @param {*} response 
 */
const fetchLoginSuccess = (response) => ({
  type: appActions.LOGIN_SUCCESS,
  payload: response
})


/**
 * Creates an action to pass our store an error returned from the login validation
 * @param {*} error 
 */
const fetchLoginFailure = (error) => ({
  type: appActions.LOGIN_FAILURE,
  payload: error
})


/**
 * Wraps all of our dispatch functions in one. Attempts to check our login 
 * information with the backend.
 */
export function fetchLogin() {
  return (dispatch) => {
    // Notify store we're attempting to login
    dispatch(fetchLoginLoading());

    // Set up options
    let uri = `${URI}/auth/validate`;
    let options = {
      withCredentials: true,
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        'Accept': 'application/json'
      }
    };

    rp(uri, options)
      .then(res => JSON.parse(res))
      .then(data => dispatch(fetchLoginSuccess(data)))
      .catch(err => dispatch(fetchLoginFailure(JSON.parse(err))));
  }
}