/**
 * Business Requirements class
 * Responsible for validating *all* form inputs, not just individual fields
 * e.g. start and end times have constraints in addition to their raw field values.
 */

import Schedule       from './Schedule';
import { 
  isWeekend,
  validTimes
}                     from './date.utils';
import {
  validContactEmail,
  validIowaEmail,
  validEventName,
  validEventComments,
  validDate,
  validTime,
  validProvider,
  validNumberPeople
}                     from './param.utils';


export default class BusinessRequirements {
  constructor() {
    this.errors = {};
    this.fieldMap = {
      'user_email'   : validIowaEmail,
      'contact_email': validContactEmail,
      'num_people'   : validNumberPeople,
      'event_name'   : validEventName,
      'comments'     : validEventComments,
      'date'         : validDate,
      'start_time'   : validTime,
      'end_time'     : validTime
    };
    this.errorMap = {
      'user_email'   : 'Invalid Iowa Email',
      'contact_email': 'Invalid email format',
      'num_people'   : 'Invalid number',
      'event_name'   : 'Invalid event name',
      'comments'     : 'Invalid comments',
      'date'         : 'Invalid date',
      'start_time'   : 'Invalid time',
      'end_time'     : 'Invalid time'
    }
  }

  validField(field, value) {
    /* Validates individual fields on update. */

    if ((value !== undefined) && (field in this.fieldMap)) {
      let validationFunc = this.fieldMap[field];
      let validVal = validationFunc(value);
      
      // If the validation function failed update with error message
      if (!validVal) this.errors[field] = this.errorMap[field];
      // Otherwise explicitly clear the error (in case user corrected input)
      else delete this.errors[field];
    };
  }

  validateTime(start_time, end_time) {
    /* Ensures the proposed start time is before end time. */
    
    // Make sure both times are valid and entered
    if ((start_time === '') || (end_time === '')) return null;
    
    // Otherwise convert to dates and compare
    if (!validTimes(start_time, end_time)) 
      this.errors['end_time'] = 'End time must be later than starting time.';
  }

  validateFoodDrink(food_drink_required, food_provider, drink_provider) {
    /* Ensures if there is a food/drink flag that one of the forms are filled. */

    // Only validate if flag is true
    if (food_drink_required === true) {

      // Display error if neither are filled out
      if ((food_provider === "") && (drink_provider === "")) 
        this.errors['food_drink_provider'] = "Must have at least one provider if your event serves food or drink.";
      // Otherwise, validate that at least one provider is valid
      else {
        if (food_provider !== '' && !validProvider(food_provider)) this.errors['food_provider_error'] = 'Invalid format.';
        if (drink_provider !== '' && !validProvider(drink_provider)) this.errors['alcohol_provider_error'] = 'Invalid format';
      }
    } 
  }

  validateMFK(setup_required, setup_mfk) {
    return null;
  }

  validateSchedule(start_time, end_time, date, event_title, room_schedule) {
    /* Validates there are no overlaps in proposed time. */

    // Make sure we have valid times/dates before we execute schedule validation
    if (validTimes(start_time, end_time) && validDate(date)) {

      // Create an object for our proposed event time
      let new_event = { start_time, end_time, date, event_title };

      // Create a schedule instance
      let schedule  = new Schedule(new_event, room_schedule);

      // Check for overlaps
      const overlaps = schedule.getOverlap();

      // If we find an overlap, set the error
      if (overlaps) this.errors['schedule_overlap'] = overlaps;
      // Otherwise clear it
      else delete this.errors['schedule_overlap'];
    };
  }

  validWeekend(date, coph_email) {
    /**  Ensures that if the event is on a weekend, that a valid CoPH email 
     *   is also entered. 
     */
    let isDateWeekend = isWeekend(date);
    let validCophEmail = validIowaEmail(coph_email);

    // If they haven't yet filled out the email field explain why
    if (isDateWeekend && coph_email === '') this.errors['coph_email'] = 'You must enter a CoPH ' +
      'employee email if your event is on a weekend.';
    // If they HAVE filled it out, ensure it's an iowa address
    else if (isDateWeekend && !validCophEmail) this.errors['coph_email'] = 
      'CoPH email must be a valid Iowa email address.';
  }

  validate(info, errors, schedule=[], field=undefined, value=undefined) {
    /* Runs all of our validation functions, returning an object holding errors. */
    
    // Set our errors to those from our state passed as param
    this.errors = errors;

    // Validate the last updated field
    this.validField(field, value);

    // Make sure our times are valid
    this.validateTime(info.start_time, info.end_time);

    // Make sure food/drink is valid
    this.validateFoodDrink(info.food_drink_required, info.food_provider, info.alcohol_provider);

    // Make sure Setup MFK is valid
    //this.validateMFK(info.setup_required, info.setup_mfk);

    // Make sure there are no overlaps in scheduling
    this.validateSchedule(info.start_time, info.end_time, info.date, info.event_title, schedule);

    // Weekend + CoPH employees
    this.validWeekend(info.date, info.coph_email);

    return this.errors;
  }
}