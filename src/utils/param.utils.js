/**
 * Parameter validation
 */
const {
  isAfter,
  isAscii,
  isBefore,
  isIn,
  isInt,
  isISO8601,
  isEmail,
  isLength,
  contains
}                     = require('validator');
const { 
  sixMonthsFromToday,
  getDateISO
}                     = require('./date.utils');
const times           = require('../constants/time.constants').map(d => d.key);


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
    isAfter(date) &&
    isBefore(date, getDateISO(sixMonthsFromToday()))
  ); 
}


const validTime = time => isIn(time, times);


const validRoomNumber = () => null;


const validCourseReference = () => null;


const validSetupMFK = () => null;


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
  validNumberPeople
};
