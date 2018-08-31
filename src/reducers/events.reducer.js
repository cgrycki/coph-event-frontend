/**
 * Events Reducer
 */
import initialStore from '../store/initialStore';
import { 
  eventActions,
  fieldActions
}                   from '../constants/actionTypes';

export const eventReducer = (state=initialStore.events, action) => {
  const type = action.type;
  var evt, evts, package_id, permissions, error;

  switch (type) {
    /** Initiated a REST call */
    case eventActions.EVENT_LOADING:
      return { ...state, event_loading: true };

    /** A REST call failed */
    case eventActions.EVENT_ERROR:
      return { ...state, event_loading: false, event_error: action.payload.error };

    /** Reset REST status for events */
    case eventActions.EVENT_RESET:
      return { ...state, event_loading: false, event_error: null };

    case eventActions.SET_FETCH_EVENT:
      return { ...state, should_fetch: false };

    /** Successful GET request, populate event page */
    case eventActions.GET_EVENT_SUCCESS:
      var { evt, permissions } = action.payload;
      return { ...state, event_loading: false, event: evt, permissions };

    /** Success GET request, populate events list. */
    case eventActions.GET_EVENTS_SUCCESS:
      evts = action.payload;
      return { 
        ...state, 
        event_loading: false,
        event_error  : null,
        events       : evts
      };

    /** Successful DELETE request, filter event with matching Package ID */
    case eventActions.DELETE_EVENT_SUCCESS:
      let delPID = +action.payload['package_id'];
      let filtered_events = state.events.filter(e => e.evt.package_id !== delPID);

      return { 
        ...state,
        event_loading: false,
        event_error  : null,
        events       : filtered_events
      };

    /** Successful POST request, add event to our events list */
    case fieldActions.SUBMIT_FORM_SUCCESS:
      const events_plus_new = [...state.events, action.payload];
      return { ...state, events: events_plus_new, event: action.payload };

    /** Populate event page information */
    case eventActions.POPULATE_EVENT_INFO:
      var { evt, permissions } = action.payload;
      return { ...state, event: evt, permissions };

    default:
      return state;
  }
}