import {scheduleActions} from '../constants/actionTypes';
import initialStore      from '../store/newInitialStore';
import moment            from 'moment';


export const schedulesReducer = (state=initialStore.schedules, action) => {
  let {type} = action;
  switch(type) {

    /** Sets the loading flag for schedule requests */
    case scheduleActions.FETCH_SCHEDULE_LOADING:
      return { ...state, schedule_loading: true };

    /** Parses and formats incoming schedules from MAUI via our API. */
    case scheduleActions.FETCH_SCHEDULE_SUCCESS:
      const local_time_schedule = action.payload.schedule.map(evt => {
        // Localize the UTC times
        let localStart = moment.utc(evt.start_time).add(5, 'hours');
        let localEnd   = moment.utc(evt.end_time).add(5, 'hours');

        // Convert to JS Date object
        evt.start_time = new Date(localStart),
        evt.end_time = new Date(localEnd);

        return evt;
      });

      return { 
        ...state, 
        schedules       : local_time_schedule,
        schedule_loading: false,
        schedule_error  : null
      };
    
    /** Notifies store of an error */
    case scheduleActions.FETCH_SCHEDULE_FAILURE:
      let error = action.payload;
      let schedule_error = error.message;
      return { ...state, schedule_loading: false, schedule_error };

    /** Reset store REST status + data */
    case scheduleActions.FETCH_SCHEDULE_RESET:
      return {...initialStore.schedules};
    
    default:
      return state;
  }
}