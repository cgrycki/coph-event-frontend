/**
 * Application Reducer
 */
import { appActions } from '../constants/actionTypes';
import { initialStore } from '../store/initialStore';


export const appReducer = (state=initialStore.app, action) => {
  let type = action.type;
  
  switch (type) {
    case (appActions.UPDATE_LOGIN):
      return {...state, app: {...state.app, loggedIn: action.value }};
    
    case (appActions.UPDATE_STEP):
      return {...state, app: {...state.app, step: action.step }};

    case (appActions.SUBMIT_FORM):
      return {...state, app: {...state.app, save_status: 'SAVING' }};

    default:
      return state;
  }
}