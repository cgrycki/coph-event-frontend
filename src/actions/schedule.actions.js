import {scheduleActions}  from '../constants/actionTypes';
import {updateForm}       from './form.actions';
import {stringify}        from 'querystring';
import * as rp            from 'request-promise';
const URI                 = process.env.REACT_APP_REDIRECT_URI;

/**
 * Notifies our application that we're loading an API for room schedules
 */
const fetchScheduleLoading = () => ({
  type: scheduleActions.FETCH_SCHEDULE_LOADING
})


const fetchScheduleSuccess = (response) => ({
  type   : scheduleActions.FETCH_SCHEDULE_SUCCESS,
  payload: response
})


/**
 * Notifies application of unsuccessful room call.
 * @param {error} error Error returned from our API call
 */
const fetchScheduleFailure = (error) => ({
  type   : scheduleActions.FETCH_SCHEDULE_FAILURE,
  payload: error
})

/**
 * Wraps the loading/success/error state dispatches for async room schedule fetches.
 */
export function fetchCalendarSchedule(room_number, start, end) {
  return (dispatch) => {
    // Notify the store we're making an async call
    dispatch(fetchScheduleLoading());

    // Create the query and URL for our API call
    const query = stringify({ room_number: room_number });
    const uri   = `${URI}/maui/schedules/${start}/${end}/?${query}`;
    
    const options = {
      method         : 'GET',
      withCredentials: true,
      json           : true,
      headers        : {
        'Accept': 'application/json'
      }
    };

    rp(uri, options)
      .then(data => dispatch(fetchScheduleSuccess(data)))
      .catch(err => dispatch(fetchScheduleFailure(err)))
      .finally(() => dispatch(updateForm(undefined, undefined)));
  }
}