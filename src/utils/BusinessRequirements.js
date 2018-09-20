/**
 * Business Requirements class
 * Responsible for validating *all* form inputs, not just individual fields
 * e.g. start and end times have constraints in addition to their raw field values.
 */

import Schedule       from './Schedule';
import { 
  isWeekend,
  isAfterHours,
  validTimes
}                     from './date.utils';
import {
  validContactEmail,
  validIowaEmail,
  validEventName,
  validEventComments,
  validDate,
  validTime,
  validSetupMFK,
  validProvider,
  validNumberPeople
}                     from './param.utils';



export default class BusinessRequirements {
  constructor() {
    this.errors = {};
    this.fieldMap = {
      'user_email'   : validIowaEmail,
      'contact_email': validContactEmail,
      'coph_email'   : validIowaEmail,
      'num_people'   : validNumberPeople,
      'event_name'   : validEventName,
      'comments'     : validEventComments,
      'date'         : validDate,
      'start_time'   : validTime,
      'end_time'     : validTime
    };
    this.errorMap = {
      'user_email'   : 'Invalid Iowa email',
      'contact_email': 'Invalid email format',
      'coph_email'   : 'Invalid Iowa email',
      'num_people'   : 'Invalid number',
      'event_name'   : 'Invalid event name',
      'comments'     : 'Invalid comments',
      'date'         : 'Invalid date',
      'start_time'   : 'Invalid time',
      'end_time'     : 'Invalid time'
    }
  }

  /** Validates individual fields on update. */
  validField(field, value) {
    if ((value !== undefined) && (field in this.fieldMap)) {
      let validationFunc = this.fieldMap[field];
      let validVal = validationFunc(value);
      
      // If the validation function failed update with error message
      if (!validVal) this.errors[field] = this.errorMap[field];
      // Otherwise explicitly clear the error (in case user corrected input)
      else delete this.errors[field];
    };
  }

  /** Ensures the proposed start time is before end time. */
  validateTimes(start_time, end_time) {
    // Make sure both times are valid and entered
    if ((start_time === "") || (end_time === "")) return null;
    
    // Otherwise convert to dates and compare
    if (!validTimes(start_time, end_time)) 
      this.errors['end_time'] = 'End time must be later than starting time.';
    else delete this.errors['end_time'];
  }

  /** Ensures if there is a food/drink flag that one of the forms are filled. */
  validateFoodDrink(food_drink_required, food_provider, drink_provider) {
    // Only validate if flag is true
    if (food_drink_required === true) {

      // Shorthand variables
      let fd_empty = food_provider === "";
      let dr_empty = drink_provider === "";

      // Display error if neither are filled out
      if (fd_empty && dr_empty) 
        this.errors['food_drink_provider'] = "Must have at least one provider if your event serves food or drink.";
      else {
        // Validate at least one provider is valid
        if ((!fd_empty || !dr_empty) && 
            (validProvider(food_provider) || validProvider(drink_provider)))
              delete this.errors['food_drink_provider'];

        // Continue to validate providers regardless
        if (!fd_empty && !validProvider(food_provider))
          this.errors['food_provider_error'] = 'Invalid length.';
        else if (!fd_empty && validProvider(food_provider))
          delete this.errors['food_provider_error'];
        
        if (!dr_empty && !validProvider(drink_provider))
          this.errors['alcohol_provider_error'] = 'Invalid length';
        else if (!dr_empty && validProvider(drink_provider))
          delete this.errors['alcohol_provider_error'];
      }
    } else {
      // Clear the error if user isn't having food
      delete this.errors['food_drink_provider'];
      delete this.errors['food_provider_error'];
      delete this.errors['alcohol_provider_error'];
    };
  }

  /** Ensures there is a course if the references_course toggle is true */
  validateCourse(references_course, referenced_course) {
    if ((references_course === true) && (referenced_course === '')) { 
        this.errors['referenced_course'] = "You must select a course before proceeding.";
    }
    // Clear the errors
    else delete this.errors['referenced_course'];
  }

  /** Validates that an MFK accounting number satisfies all of it's requirements */
  validateMFK(setup_required, setup_mfk) {
    if (setup_required === true) {
      let errorFlag = false;

      // For each MFK portion, map it's field and value to the MFK validation function
      Object
        .entries(setup_mfk)
        .map(entry => validSetupMFK(entry[0], entry[1]))
        .forEach(mfkValidation => {
          // Check if we failed any failed// all MFK fields passed
          if (mfkValidation !== true) errorFlag = mfkValidation;
        });

      if (errorFlag !== false) this.errors['setup_required'] = errorFlag;
      else delete this.errors['setup_required'];
    }
    else { delete this.errors['setup_required']; }
  }

  /** Validates there are no overlaps in proposed time. */
  validateSchedule(start_time, end_time, date, event_title, room_schedule) {
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

  /**
   * Ensures that if the proposed date is on a weekend, that a 
   * valid College of Public Health employee email is also entered.
   */
  validCophEmail(date, start, end, coph_email) {
    // Field level validation
    const weekendDate    = isWeekend(date);
    const afterHours     = isAfterHours(start, end);
    const emptyCophEmail = coph_email === '';
    const validCophEmail = validIowaEmail(coph_email);

    // Short hand errors
    const errBase = 'You must enter a CoPH employee email ';
    const errForm = 'You must enter a valid U. Iowa email address.';

    // Base case: date + times are valid (7-5 M-F)
    if (!weekendDate && !afterHours)  delete this.errors['coph_email'];
    else if (weekendDate && emptyCophEmail)  this.errors['coph_email'] = errBase + 'if your event is on a weekend.';
    else if (afterHours  && emptyCophEmail)  this.errors['coph_email'] = errBase + 'if your event is outside business hours.'
    else if (weekendDate && !validCophEmail) this.errors['coph_email'] = errForm;
    else if (afterHours  && !validCophEmail) this.errors['coph_email'] = errForm;


  }

  /** Runs all of our validation functions, returning an object holding errors. */
  validate(info, errors, schedule=[], field=undefined, value=undefined) {
    // Set our errors to those from our state passed as param
    this.errors = errors;

    // Validate the last updated field
    this.validField(field, value);

    // Make sure our times are valid
    this.validateTimes(info.start_time, info.end_time);

    // Make sure food/drink is valid
    this.validateFoodDrink(info.food_drink_required, info.food_provider, info.alcohol_provider);

    // Make sure the course selection is valid
    this.validateCourse(info.references_course, info.referenced_course);

    // Make sure Setup MFK is valid
    this.validateMFK(info.setup_required, info.setup_mfk);

    // Make sure there are no overlaps in scheduling
    this.validateSchedule(info.start_time, info.end_time, info.date, info.event_title, schedule);

    // CoPH employee email if date is weekend or time is after hours
    this.validCophEmail(info.date, info.start_time, info.end_time, info.coph_email);

    return this.errors;
  }
}