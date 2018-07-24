/**
 * Action Types for Redux
 */


// Fields
export const fieldActions = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  RESET_FIELD : 'RESET_FIELD'
}


// Editor
export const editorActions = {
  ADD_ITEM     : 'ADD_ITEM',
  SELECT_ITEM  : 'SELECT_ITEM',
  UPDATE_ITEM  : 'UPDATE_ITEM',
  REMOVE_ITEM  : 'REMOVE_ITEM',
  UPDATE_EDITOR: 'UPDATE_EDITOR'
}


// Rooms
export const roomActions = {
  FETCH_ROOMS_LOADING: 'FETCH_ROOMS_LOADING',
  FETCH_ROOMS_SUCCESS: 'FETCH_ROOMS_SUCCESS',
  FETCH_ROOMS_FAILURE: 'FETCH_ROOMS_FAILURE',
  FETCH_ROOMS_RESET  : 'FETCH_ROOMS_RESET'
}


// Application
export const appActions = {
  UPDATE_LOGIN: 'UPDATE_LOGIN',
  UPDATE_STEP : 'UPDATE_STEP',
  SUBMIT_FORM : 'SUBMIT_FORM'
}