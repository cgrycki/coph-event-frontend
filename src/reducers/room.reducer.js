/**
 * Room reducer
 */
import { roomActions } from '../constants/actionTypes';
import initialStore from '../store/initialStore';

export const roomReducer = (state=initialStore.rooms, action) => {
  let rooms_error;
  let type = action.type;

  switch (type) {
    case (roomActions.FETCH_ROOMS_LOADING):
      return { ...state, rooms_loading: true };

    case (roomActions.FETCH_ROOMS_SUCCESS):
      return { rooms: action.payload, rooms_loading: false, rooms_error: null };

    case (roomActions.FETCH_ROOMS_FAILURE):
      rooms_error = action.payload;
      return { rooms: [], rooms_loading: false, rooms_error };

    case (roomActions.FETCH_ROOMS_RESET):
      return { ...initialStore.rooms };

    default:
      return state;
  }
}

