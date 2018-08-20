/**
 * Application Reducer
 */
import { appActions } from '../constants/actionTypes';
import initialStore from '../store/initialStore';


export const appReducer = (state=initialStore.app, action) => {
  let error, login_error;
  let type = action.type;
  
  switch (type) {
    // Login validation cases
    case appActions.LOGIN_LOADING:
      return { ...state, login_loading: true };

    case appActions.LOGIN_SUCCESS:
      var { loggedIn, hawkid } = action.payload;
      return {
        ...state, 
        loggedIn: loggedIn, 
        user_email: `${hawkid}@uiowa.edu`, 
        login_loading: false
      };

    case appActions.LOGIN_FAILURE:
      error = action.payload;
      login_error = error.message;
      return {...state, login_loading: false, login_error };
       
    default:
      return state;
  }
}