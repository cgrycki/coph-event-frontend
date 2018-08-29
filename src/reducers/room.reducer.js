/**
 * Room reducer
 */
import { roomActions, fieldActions } from '../constants/actionTypes';
import moment from 'moment';
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
      const local_time_schedule = action.payload.schedule.map(evt => {
        // Localize the UTC times
        let localStart = moment.utc(evt.start_time).add(5, 'hours');
        let localEnd   = moment.utc(evt.end_time).add(5, 'hours');

        // Convert to JS Date object
        evt.start_time = new Date(localStart),
        evt.end_time = new Date(localEnd);

        return evt;
      });

      return { 
        ...state, 
        room_schedule: local_time_schedule, 
        schedule_loading: false, 
        schedule_error: null
      };

    case roomActions.FETCH_SCHEDULE_FAILURE:
      error = action.payload;
      schedule_error = error.message;
      return { ...state, schedule_loading: false, schedule_error };

    /** Reset Schedules on form creation ---------------------------------------*/
    case fieldActions.POPULATE_FIELDS:
      return { ...state, room_schedule: [] };
    
    /** Reset MAUI REST --------------------------------------------------------*/
    case roomActions.FETCH_ROOMS_RESET:
      return { ...initialStore.rooms };

    default:
      return state;
  }
  
}

