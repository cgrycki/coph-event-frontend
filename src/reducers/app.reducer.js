/**
 * Application Reducer
 */
import { appActions } from '../constants/actionTypes';
import initialStore   from '../store/initialStore';


export const appReducer = (state=initialStore.app, action) => {
  let error, login_error;
  let type = action.type;
  
  switch (type) {
    // Login validation cases
    case appActions.LOGIN_LOADING:
      return { ...state, login_loading: true };

    case appActions.LOGIN_SUCCESS:
      var { loggedIn: logged_in, hawkid, isAdmin: is_admin } = action.payload;
      const user_email = (logged_in) ? `${hawkid}@uiowa.edu` : '';

      return {
        ...state, 
        logged_in    : logged_in,
        user_email   : user_email,
        login_loading: false,
        is_admin     : is_admin
      };

    case appActions.LOGIN_FAILURE:
      error = action.payload;
      login_error = error.message;
      return {...state, login_loading: false, login_error };
       
    default:
      return state;
  }
}