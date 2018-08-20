/**
 * Application Reducer
 */
import { appActions } from '../constants/actionTypes';
import initialStore from '../store/initialStore';


export const appReducer = (state=initialStore.app, action) => {
  let error, login_error;
  let type = action.type;
  
  switch (type) {
    // TO FINISH
    case (appActions.UPDATE_PATH):
      return {...state, path: action.path };

    // Login validation cases
    case (appActions.LOGIN_LOADING):
      return { ...state, login_loading: true };

    case (appActions.LOGIN_SUCCESS):
      var { loggedIn, hawkid } = action.payload;
      return {
        ...state, 
        loggedIn: loggedIn, 
        user_email: `${hawkid}@uiowa.edu`, 
        login_loading: false
      };

    case (appActions.LOGIN_FAILURE):
      error = action.payload;
      login_error = error.message;
      return {...state, login_loading: false, login_error };

    // User information cases
    case (appActions.USER_LOADING):
      return { ...state, user_loading: true };

    case (appActions.USER_ERROR):
      return { ...state, user_loading: false, user_error: action.payload };

    case (appActions.USER_SUCCESS):
      let { isAdmin, user_email } = action.payload;
      return { ...state, user_loading: false, user_email, isAdmin };
       
    default:
      return state;
  }
}