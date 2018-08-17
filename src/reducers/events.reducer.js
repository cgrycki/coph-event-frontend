/**
 * Events Reducer
 */
import initialStore from '../store/initialStore';
import { eventActions } from '../constants/actionTypes';

export const eventReducer = (state=initialStore.events, action) => {
  let type = action.type;

  switch (type) {
    case (eventActions.EVENT_LOADING):
      return { ...state, event_loading: true };

    case (eventActions.EVENT_ERROR):
      return { ...state, event_loading: false, event_error: action.payload.error };

    case (eventActions.EVENT_SUCESS):
      let { evt, permissions } = action.payload;
      return { ...state, event_loading: false, event: evt, permissions };

    case (eventActions.EVENTS_SUCESS):
      let eventsInfo = action.payload;
      return { ...state, event_loading: false, events: eventsInfo };

    default:
      return state;
  }
}