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
  type: appActions.LOGIN_SUCESS,
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
    let uri = `${URI}auth/validate`;
    let options = {
      withCredentials: true,
      method: 'GET'
    };

    rp(uri, options)
      .then(res => res.json())
      .then(data => dispatch(fetchLoginSuccess(data)))
      .catch(err => dispatch(fetchLoginFailure(err)));
  }
}


/**
 * Updates our application's progress
 * @param {int} step Interger updating which wizard step to render
 */
export const updatePath = (path) => ({
  type: appActions.UPDATE_PATH,
  path
})


/**
 * Initiates submitting our form data to the server.
 */
export const submitForm = () => ({
  type: appActions.SUBMIT_FORM
})


/**
 * Notifies application we're initiating a user information API call
 */
const fetchUserLoading = () => ({
  type: appActions.USER_LOADING
})


/**
 * Notifies application of error during user information API call
 * @param {object} error Error returned from API
 */
const fetchUserError = (error) => ({
  type   : appActions.USER_ERROR,
  payload: error
})


/**
 * Updates store with user information from our API call
 * @param {object} response Payload with user's email and admin boolean
 */
const fetchUserSuccess = (response) => ({
  type   : appActions.USER_SUCCESS,
  payload: response
})


/**
 * Wraps our dispatches together to retrieve user information from our server
 */
export function getUser() {
  return (dispatch) => {
    // Notify start
    dispatch(fetchUserLoading());

    // URI + options for API call
    let uri = `${URI}users/`;
    let options = {
      method: 'GET',
      withCredentials: true
    };

    // Resolve promise
    rp(uri, options)
      .then(res => res.json())
      .then(data => dispatch(fetchUserSuccess(data)))
      .catch(err => dispatch(fetchUserError(err)));
  }
}
