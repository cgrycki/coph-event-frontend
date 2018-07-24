/**
 * Room reducer
 */
import { roomActions } from '../constants/actionTypes';
import { initialStore } from '../store/initialStore';

export const roomReducer = (state=initialStore.rooms, action) => {
  let error;
  let type = action.type;

  switch (type) {
    case (roomActions.FETCH_ROOMS):
      return { ...state, loading: true };

    case (roomActions.FETCH_ROOMS_SUCCESS):
      return { rooms: action.payload, loading: false, error: null };

    case (roomActions.FETCH_ROOMS_FAILURE):
      error = action.error || action.error.message;
      return { rooms: [], loading: false, error: error };

    case (roomActions.FETCH_ROOMS_RESET):
      return initialStore.rooms;

    default:
      return state;
  }
}

