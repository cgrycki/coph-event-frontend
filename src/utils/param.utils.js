/**
 * Parameter validation
 */
const {
  isAscii,
  isBefore,
  isIn,
  isInt,
  isISO8601,
  isEmail,
  isEmpty,
  isLength,
  contains
}                     = require('validator');
const { 
  sixMonthsFromToday,
  getDateISO
}                     = require('./date.utils');
const times           = require('../constants/time.constants').map(d => d.key);
const {
  setup_mfk_fields }  = require('../constants/fieldTypes');


const validIowaEmail = email => {
  return (
    isEmail(email) &&
    contains(email, 'uiowa.edu')
  );
}


const validContactEmail = contact_email => {
  return (contact_email === "") ? true : isEmail(contact_email);
}


const validEventName = event_name => isLength(event_name, {min: 5, max: 50});


const validEventComments = comments => isLength(comments, { max: 3000 });


const validDate = date => {
  /* Must be a ISO formatted date AND must be after today AND not > 6 months */
  return (
    isISO8601(date) &&
    isBefore(date, getDateISO(sixMonthsFromToday()))
  ); 
}


const validTime = time => isIn(time, times);


const validRoomNumber = () => null;


const validCourseReference = () => null;


/**
 * Validates a portion of the MFK Accounting field
 * @param {string} field Setup MFK field: Like FUND, ORGACCT, etc...
 * @param {string} value User input returned from an onChange event
 */
const validSetupMFK = (field, value) => {
  // Grab the MFK field specs from array 
  let mfk_field = setup_mfk_fields.find(mfk => mfk.field === field);

  // Most importantly, if this field is required and empty than not valid
  if (mfk_field.required && isEmpty(value)) return false;

  // So now the field is either not required or not empty
  // So if its not required and empty it's valid
  else if (!mfk_field.required && isEmpty(value)) return true;

  // Otherwise it's either required or not empty
  else return (isInt(value) && isLength(value, mfk_field.maxLength));
};


const validProvider = provider => 
  isLength(provider, { min: 5, max: 50 }) &&
  isAscii(provider);


const validNumberPeople = num_people => 
  isInt(num_people, { min: 1, max: 206 });


module.exports = {
  validContactEmail,
  validIowaEmail,
  validEventName,
  validEventComments,
  validDate,
  validTime,
  validProvider,
  validSetupMFK,
  validNumberPeople
};
