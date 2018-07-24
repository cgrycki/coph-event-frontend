/**
 * Application Reducer
 */
import { appActions } from '../constants/actionTypes';
import initialStore from '../store/initialStore';


export const appReducer = (state=initialStore.app, action) => {
  let type = action.type;
  
  switch (type) {
    case (appActions.UPDATE_STEP):
      return {...state.app, step: action.step };

    case (appActions.SUBMIT_FORM):
      return {...state.app, save_status: 'SAVING' };

    case (appActions.LOGIN_LOADING):
      return {...state, login_loading: true};

    case (appActions.LOGIN_SUCESS):
      var response = action.payload;
      console.log(response);
      return {...state, loggedIn: response.loggedIn, login_loading: false };

    case (appActions.LOGIN_FAILURE):
      var err = action.payload;
      console.log(err);
      return {...state, login_loading: false, login_error: err };

    default:
      return state;
  }
}