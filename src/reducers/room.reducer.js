/**
 * Room reducer
 */
import {roomActions}  from '../constants/actionTypes';
import initialStore   from '../store/initialStore';

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
        rooms        : action.payload,
        rooms_loading: false,
        rooms_error  : null
      };

    case roomActions.FETCH_ROOMS_FAILURE:
      error = action.payload;
      rooms_error = error.message;
      return {...state, rooms_loading: false, rooms_error};
    
    /** Reset MAUI REST --------------------------------------------------------*/
    case roomActions.FETCH_ROOMS_RESET:
      return { ...initialStore.rooms };

    default:
      return state;
  }
  
}

