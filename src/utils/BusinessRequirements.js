/**
 * Business Requirements class
 * Responsible for validating *all* form inputs, not just individual fields
 * e.g. start and end times have constraints in addition to their raw field values.
 */

import Schedule from './Schedule';

export default class BusinessRequirements {
  constructor() {
    this.errors = {}
  }

  validateTime(start_time, end_time) {
    return null;
  }

  validateFoodDrink(food_drink_required, food_provider, drink_provider) {
    /* Ensures if there is a food/drink flag that one of the forms are filled. */
    if (food_drink_required === true) {
      if ((food_provider !== "") || (drink_provider !== "")) return;
      else this.errors['food_drink_provider'] = "Must have a provider if your event serves food or drink.";
    } 
  }

  validateMFK(setup_required, setup_mfk) {
    return null;
  }

  validateSchedule(start_time, end_time, date, event_title, room_schedule) {
    // Create an object for our proposed event time
    let new_event = { start_time, end_time, date, event_title };

    // Create a schedule instance
    let schedule  = new Schedule(new_event, room_schedule);

    // Check for overlaps
    const noOverlaps = schedule.getOverlap();

    this.errors['schedule_overlap'] = noOverlaps;
  }

  validWeekend(date, coph_email) {
    return null;
  }

  validate(info) {
    /* Runs all of our validation functions, returning an object holding errors. */ 
    this.errors = {};
    console.log(info);

    // Make sure our times are valid
    this.validateTime(info.start_time, info.end_time);

    // Make sure food/drink is valid
    this.validateFoodDrink(info.food_drink_required, info.food_provider, info.alcohol_provider);

    // Make sure Setup MFK is valid
    this.validateMFK(info.setup_required, info.setup_mfk);

    // Make sure there are no overlaps in scheduling
    //this.validateSchedule(info.start_time, info.end_time, info.date, info.event_title, room_schedule);

    // Weekend + CoPH employees
    this.validWeekend(info.date, info.coph_email);

    return this.errors;
  }
}