/**
 * Action Types for Redux
 */


// Fields
export const fieldActions = {
  UPDATE_FIELD       : 'UPDATE_FIELD',
  UPDATE_ERRORS      : 'UPDATE_ERRORS',

  SUBMIT_FORM_LOADING: 'SUBMIT_FORM_LOADING',
  SUBMIT_FORM_SUCCESS: 'SUBMIT_FORM_SUCCESS',
  SUBMIT_FORM_ERROR  : 'SUBMIT_FORM_ERROR',
  SUBMIT_FORM_RESET  : 'SUBMIT_FORM_RESET',

  POPULATE_FIELDS    : 'POPULATE_FIELDS'
};


// Editor
export const editorActions = {
  ADD_ITEM     : 'ADD_ITEM',
  SELECT_ITEM  : 'SELECT_ITEM',
  UPDATE_ITEM  : 'UPDATE_ITEM',
  REMOVE_ITEM  : 'REMOVE_ITEM',
  UPDATE_EDITOR: 'UPDATE_EDITOR'
};
// New version
export const diagramActions = {
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
  FETCH_ROOMS_RESET  : 'FETCH_ROOMS_RESET',

  FETCH_SCHEDULE_LOADING: 'FETCH_SCHEDULE_LOADING',
  FETCH_SCHEDULE_SUCCESS: 'FETCH_SCHEDULE_SUCCESS',
  FETCH_SCHEDULE_ERROR  : 'FETCH_SCHEDULE_ERROR',
  FETCH_SCHEDULE_RESET  : 'FETCH_SCHEDULE_RESET'
};
// newly added
export const scheduleActions = {
  FETCH_SCHEDULE_LOADING: 'FETCH_SCHEDULE_LOADING',
  FETCH_SCHEDULE_SUCCESS: 'FETCH_SCHEDULE_SUCCESS',
  FETCH_SCHEDULE_ERROR  : 'FETCH_SCHEDULE_ERROR',
  FETCH_SCHEDULE_RESET  : 'FETCH_SCHEDULE_RESET'
};


// Events
export const eventActions = {
  EVENT_RESET         : 'EVENT_RESET',
  EVENT_LOADING       : 'EVENT_LOADING',
  EVENT_ERROR         : 'EVENT_ERROR',

  GET_EVENT_SUCCESS   : 'GET_EVENT_SUCCESS',
  GET_EVENTS_SUCCESS  : 'GET_EVENTS_SUCCESS',
  DELETE_EVENT_SUCCESS: 'DELETE_EVENT_SUCCESS',
  PATCH_EVENT_SUCCESS : 'PATCH_EVENT_SUCCESS',

  POPULATE_EVENT_INFO : 'POPULATE_EVENT_INFO',
  SET_FETCH_EVENT     : 'SET_FETCH_EVENT'
};




// Application
export const appActions = {
  LOGIN_LOADING: 'LOGIN_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE'
};
