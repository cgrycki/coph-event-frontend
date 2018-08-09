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
      start_time : moment(evt.startTime.trim(), "hh:mmA"),
      end_time   : moment(evt.endTime.trim(), "hh:mmA"),
      event_title: evt.title,
      date       : evt.date,
      new_event  : false
    };

    return formatted_evt;
  }

  formatEventReact(evt) {
    /* Formats an object taken from our store */
    const formatted_evt = {
      start_time : moment(evt.start_time, fmt_time),
      end_time   : moment(evt.end_time, fmt_time),
      event_title: evt.event_title,
      date       : evt.date,
      new_event  : true
    };
    return formatted_evt;
  }

  getOverlap() {
    /* Finds if there is an overlap in our events' start/end times */

    // First, combine all of the potential events in one array
    let all_events = [this.new_event, ...this.room_schedule];

    // Base case: if there's only one event then we're good to go
    const n = all_events.length;
    if (n === 1) return false;

    // Sort by the event starting time in increasing *start* order
    all_events.sort((a, b) => a.start_time - b.start_time);

    /*Iterate through the events from 0:n-1, checking for overlaps
      events have a range defined by start and end times.
      Two events overlap in one of two cases:
        - eventA starts before and ends after B
        - the start/end of an event is contained within the other
    */
    for (var i = 0; i < n-1; i++) {
      let current = all_events[i], 
          next    = all_events[i+1];
      
      if (current.end_time.isSameOrAfter(next.start_time)) return true;
    };

    // No overlaps detected!
    return false;
  }
}

module.exports = Schedule;