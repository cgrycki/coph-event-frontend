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

  switch (type) {
    /** Initiated a REST call */
    case eventActions.EVENT_LOADING:
      return { ...state, event_loading: true };

    /** A REST call failed */
    case eventActions.EVENT_ERROR:
      return { ...state, event_loading: false, event_error: action.payload.error };

    /** Successful GET request, populate single event */
    case eventActions.GET_EVENT_SUCCESS:
      let { evt, permissions } = action.payload;
      return { ...state, event_loading: false, event: evt, permissions };

    /** Success GET request, populate events list. */
    case eventActions.GET_EVENTS_SUCCESS:
      const eventsInfo = action.payload;
      return { 
        ...state, 
        event_loading: false,
        event_error  : null,
        events       : eventsInfo
      };

    /** Successful DELETE request, filter event with matching Package ID */
    case eventActions.DELETE_EVENT_SUCCESS:
      const package_id = +action.payload.package_id;
      const filtered_events = state.events.filter(e => e.package_id !== package_id);

      return { 
        ...state,
        event_loading: false,
        event_error  : null,
        events       : filtered_events
      };

    /** Successful POST request, add event to our list */
    case fieldActions.SUBMIT_FORM_SUCCESS:
      const events_plus_new = [...state.events, action.payload];
      return { ...state, events: events_plus_new, event: action.payload };

    default:
      return state;
  }
}