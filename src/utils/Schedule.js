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
      start_time : moment(evt.startTime, fmt_time),
      end_time   : moment(evt.endTime, fmt_time),
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
    if (n === 1) return true;

    // Sort by the event starting time in increasing order
    all_events.sort((a, b) => a.start_time - b.start_time);

    // Iterate through the events from 0:n-1, checking for overlaps
    for (var i = 1; i < n-1; i++) {
      let previous = all_events[i-1], 
          current  = all_events[i];
      
      if (previous.end_time >= current.start_time) return false;
    };

    return true;
  }
}

module.exports = Schedule;