/**
 * Events Reducer
 */
import initialStore from '../store/initialStore';
import { 
  eventActions,
  formActions
}                   from '../constants/actionTypes';

export const eventReducer = (state=initialStore.events, action) => {
  const type = action.type;
  var event, package_id, permissions, error;

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
      var { event, permissions, layout } = action.payload;

      return { 
        ...state,
        event_loading: false,
        event_error  : null,
        current      : { event, permissions, layout }
      };

    /** Success GET request, populate events list. */
    case eventActions.GET_EVENTS_SUCCESS:
      let events = action.payload;
      return { 
        ...state,
        events,
        should_fetch : false,
        event_loading: false,
        event_error  : null
      };

    /** Successful DELETE request, filter event with matching Package ID */
    case eventActions.DELETE_EVENT_SUCCESS:
      let delPID = +action.payload['package_id'];
      let filtered_events = state.events.filter(e => e.event.package_id !== delPID);

      return { 
        ...state,
        event_loading: false,
        event_error  : null,
        events       : filtered_events
      };

    /** Successful POST request, add event to our events list */
    case formActions.SUBMIT_FORM_SUCCESS:
      // Create event object from successful POST/PATCH response
      var { event, permissions, layout } = action.payload;
      var created_event = {event, permissions, layout};
      const oldPID = event.package_id;

      // Filter events in case this was a PATCH
      const events_without_new = state.events.filter(e => e.event.package_id !== oldPID);
      const events_plus_new = [created_event, ...events_without_new];

      // Update events list and set current to created event
      return {
        ...state,
        events: events_plus_new,
        current: created_event
      };

    /** Populate event page information */
    case eventActions.POPULATE_EVENT_INFO:
      var { event, permissions, layout } = action.payload;
      return {...state, current: { event, permissions, layout }};

    default:
      return state;
  }
}