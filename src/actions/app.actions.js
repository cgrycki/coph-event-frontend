/**
 * Application actions
 */
import { appActions } from '../constants/actionTypes';
import * as rp from 'request-promise';


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
    let uri = process.env.REACT_APP_REDIRECT_URI + 'auth/validate';
    let options = {
      credentials: 'include',
      method: 'GET',
      mode: 'no-cors'
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
export const updateStep = (step) => ({
  type: appActions.UPDATE_STEP,
  step: step
})


/**
 * Submits our form data to the server.
 */
export const submitForm = () => ({
  type: appActions.SUBMIT_FORM
})
