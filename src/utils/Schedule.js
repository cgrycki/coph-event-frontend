/**
 * Class Schedule: For finding event overlaps
 */
const moment    = require("moment");
const fmt_time  = "h:mm a";

class Schedule {
  constructor(new_event, room_schedule) {
    this.new_event     = this.formatEventReact(new_event);
    this.room_schedule = room_schedule.map(this.formatEventMAUI);
  }

  formatEventMAUI(evt) {
    /* Formats an object returned by the MAUI room schedule API */ 
    const formatted_evt = {
      start_time : moment(evt.start_time),
      end_time   : moment(evt.end_time),
      event_title: evt.event_name,
      date       : evt.date,
      new_event  : false
    };

    return formatted_evt;
  }

  formatEventReact(evt) {
    /* Formats an object taken from our store */
    const react_fmt_time = `YYYY-MM-DD ${fmt_time}`;
    const start_time     = moment(`${evt.date} ${evt.start_time}`, react_fmt_time);
    const end_time       = moment(`${evt.date} ${evt.end_time}`, react_fmt_time);

    const formatted_evt = {
      start_time : start_time,
      end_time   : end_time,
      event_title: evt.event_title,
      date       : evt.date,
      new_event  : true
    };
    return formatted_evt;
  }

  getOverlap() {
    /* Finds if there is an overlap in our events' start/end times */
    let current, nextEvent, case1, case2, case3;

    // First, combine all of the potential events in one array
    let copySchedule = [...this.room_schedule];
    copySchedule.push(this.new_event);

    // Sort by the event starting time in increasing *start* order
    copySchedule.sort((a, b) => a.start_time - b.start_time);


    // Base case: if there's only one event then we're good to go
    const n = copySchedule.length;
    if (n === 1) return false;

    /*Iterate through the events from 0:n-1, checking for overlaps
      events have a range defined by start and end times.
      Two events overlap in one of two cases:
        - eventA starts before and ends after B
        - the start/end of an event is contained within the other
    */
    for (var i = 0; i < n-1; i++) {
      current   = copySchedule[i];
      nextEvent = copySchedule[i+1];

      
      // Some events have shared rooms, and will flag the overlap as true
      // even when the events are not in the same room at the same time.
      let { start_time: currSt, end_time: currEnd } = current;
      let { start_time: nextSt, end_time: nextEnd } = nextEvent;
       
      case1 = currEnd.isSameOrAfter(nextSt);
      case2 = currSt.isBefore(nextSt) && currEnd.isAfter(nextEnd);
      // Ensure overlap AND one of the overlapping events is new.
      case3 = (current.new_event === true) || (nextEvent.new_event === true);

      
      if ((case1 || case2) && case3) return true;
    };

    // No overlaps detected!
    return false;
  }
}

export default Schedule;