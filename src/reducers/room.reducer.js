/**
 * Room reducer
 */
import { roomActions } from '../constants/actionTypes';
import initialStore from '../store/initialStore';

export const roomReducer = (state=initialStore.rooms, action) => {
  let error, rooms_error, schedule_error;
  let type = action.type;

  switch (type) {
    /** Rooms ---------------------------------------------------------------*/
    case (roomActions.FETCH_ROOMS_LOADING):
      return { ...state, rooms_loading: true };

    case (roomActions.FETCH_ROOMS_SUCCESS):
      return { 
        ...state, 
        rooms: action.payload, 
        rooms_loading: false, 
        rooms_error: null 
      };

    case (roomActions.FETCH_ROOMS_FAILURE):
      error = action.payload;
      rooms_error = error.message;
      return { 
        ...state,
        rooms_loading: false, 
        rooms_error 
      };
    
    /** Room schedules ------------------------------------------------------*/
    case (roomActions.FETCH_SCHEDULE_LOADING):
      return { ...state, schedule_loading: true };

    case (roomActions.FETCH_SCHEDULE_SUCCESS):
      return { 
        ...state, 
        room_schedule: action.payload.events, 
        schedule_loading: false, 
        schedule_error: null
      };

    case (roomActions.FETCH_SCHEDULE_FAILURE):
      error = action.payload;
      schedule_error = error.message;
      return { ...state, schedule_loading: false, schedule_error };

    /** Courses ------------------------------------------------------------*/
    case roomActions.FETCH_COURSES_LOADING:
      return { ...state, course_loading: true };

    case roomActions.FETCH_COURSES_SUCCESS:
      return {
        ...state,
        course_loading: false,
        course_error: null,
        courses: action.payload
      };

    case roomActions.FETCH_COURSES_ERROR:
      return {
        ...state,
        course_loading: false,
        course_error: error
      };
    
    /** Reset MAUI REST -----------------------------------------------------*/
    case roomActions.FETCH_ROOMS_RESET:
      return { ...initialStore.rooms };

    default:
      return state;
  }
  
}

