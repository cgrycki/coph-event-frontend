/**
 * Action Types for Redux
 */


// Fields
export const fieldActions = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  RESET_FIELD : 'RESET_FIELD'
};


// Editor
export const editorActions = {
  ADD_ITEM     : 'ADD_ITEM',
  SELECT_ITEM  : 'SELECT_ITEM',
  UPDATE_ITEM  : 'UPDATE_ITEM',
  REMOVE_ITEM  : 'REMOVE_ITEM',
  UPDATE_EDITOR: 'UPDATE_EDITOR'
};


// Rooms
export const roomActions = {
  FETCH_ROOMS_LOADING: 'FETCH_ROOMS_LOADING',
  FETCH_ROOMS_SUCCESS: 'FETCH_ROOMS_SUCCESS',
  FETCH_ROOMS_FAILURE: 'FETCH_ROOMS_FAILURE',
  FETCH_ROOMS_RESET  : 'FETCH_ROOMS_RESET'
};


// Events
export const eventActions = {
  EVENT_LOADING: 'EVENT_LOADING',
  EVENT_SUCESS : 'EVENT_SUCESS',
  EVENTS_SUCESS: 'EVENTS_SUCCESS',
  EVENT_ERROR  : 'EVENT_ERROR'
};


// Application
export const appActions = {
  LOGIN_LOADING: 'LOGIN_LOADING',
  LOGIN_SUCESS : 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  UPDATE_STEP  : 'UPDATE_STEP',
  SUBMIT_FORM  : 'SUBMIT_FORM'
};