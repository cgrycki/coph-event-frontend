/**
 * Room reducer
 */
import { roomActions } from '../constants/actionTypes';
import initialStore from '../store/initialStore';

export const roomReducer = (state=initialStore.rooms, action) => {
  let error, rooms_error, schedule_error;
  let type = action.type;

  switch (type) {
    /** Rooms ------------------------------------------------------------------*/
    case roomActions.FETCH_ROOMS_LOADING:
      return { ...state, rooms_loading: true };

    case roomActions.FETCH_ROOMS_SUCCESS:
      return { 
        ...state, 
        rooms: action.payload, 
        rooms_loading: false, 
        rooms_error: null 
      };

    case roomActions.FETCH_ROOMS_FAILURE:
      error = action.payload;
      rooms_error = error.message;
      return { 
        ...state,
        rooms_loading: false, 
        rooms_error 
      };
    
    /** Room schedules ---------------------------------------------------------*/
    case roomActions.FETCH_SCHEDULE_LOADING:
      return { ...state, schedule_loading: true };

    case roomActions.FETCH_SCHEDULE_SUCCESS:
      return { 
        ...state, 
        room_schedule: action.payload.schedule.map(evt => {
          evt.start_time = new Date(evt.start_time),
          evt.end_time = new Date(evt.end_time);
          return evt;
        }), 
        schedule_loading: false, 
        schedule_error: null
      };

    case roomActions.FETCH_SCHEDULE_FAILURE:
      error = action.payload;
      schedule_error = error.message;
      return { ...state, schedule_loading: false, schedule_error };
    
    /** Reset MAUI REST --------------------------------------------------------*/
    case roomActions.FETCH_ROOMS_RESET:
      return { ...initialStore.rooms };

    default:
      return state;
  }
  
}

