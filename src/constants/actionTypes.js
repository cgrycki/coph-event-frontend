/**
 * Action Types for Redux
 */
// Form
export const formActions = {
  SUBMIT_FORM_LOADING: 'SUBMIT_FORM_LOADING',
  SUBMIT_FORM_SUCCESS: 'SUBMIT_FORM_SUCCESS',
  SUBMIT_FORM_ERROR  : 'SUBMIT_FORM_ERROR',
  SUBMIT_FORM_RESET  : 'SUBMIT_FORM_RESET',
  
  UPDATE_FIELD        : 'UPDATE_FIELD',
  UPDATE_ERRORS       : 'UPDATE_ERRORS',
  POPULATE_FORM_FIELDS: 'POPULATE_FORM_FIELDS',
  CLEAR_FORM_FIELDS   : 'CLEAR_FORM_FIELDS'
};


// Diagram editor
export const diagramActions = {
  DIAGRAM_ADD_ITEM      : 'DIAGRAM_ADD_ITEM',
  DIAGRAM_SELECT_ITEM   : 'DIAGRAM_SELECT_ITEM',
  DIAGRAM_UPDATE_ITEM   : 'DIAGRAM_UPDATE_ITEM',
  DIAGRAM_REMOVE_ITEM   : 'DIAGRAM_REMOVE_ITEM',

  DIAGRAM_UPDATE_LAYOUT : 'DIAGRAM_UPDATE_LAYOUT',
  DIAGRAM_UPDATE_COUNTS : 'DIAGRAM_UPDATE_COUNTS',
  DIAGRAM_POPULATE_ITEMS : 'DIAGRAM_POPULATE_ITEMS',
  
  DIAGRAM_LAYOUTS_LOADING: 'DIAGRAM_LAYOUTS_LOADING',
  DIAGRAM_LAYOUTS_SUCCESS: 'DIAGRAM_LAYOUTS_SUCCESS',
  DIAGRAM_LAYOUTS_ERROR  : 'DIAGRAM_LAYOUTS_ERROR',
  DIAGRAM_LAYOUTS_RESET  : 'DIAGRAM_LAYOUTS_RESET'
};

// Rooms
export const roomActions = {
  FETCH_ROOMS_LOADING: 'FETCH_ROOMS_LOADING',
  FETCH_ROOMS_SUCCESS: 'FETCH_ROOMS_SUCCESS',
  FETCH_ROOMS_FAILURE: 'FETCH_ROOMS_FAILURE',
  FETCH_ROOMS_RESET  : 'FETCH_ROOMS_RESET'
};

// Schedules
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
