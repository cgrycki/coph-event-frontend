/**
 * Application actions
 */
import { appActions } from '../constants/actionTypes';
import * as rp from 'request-promise';


/**
 * Updates our application's user login status
 * @param {boolean} value Indicates if a user is logged into a server session 
 */
export const updateLogin = (value) => ({
  type : appActions.UPDATE_LOGIN,
  value: value
})


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
