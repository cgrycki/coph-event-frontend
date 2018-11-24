/**
 * Date and Time utilities
 */
const moment = require('moment');
const times = require('../constants/time.constants')
  .map(d => d.key);


/**
 * Returns a YYYY-MM-DD formatted date string.
 * @param {string} date_string
 */
const getDateISO = (date_string) =>  moment(date_string).local().format("YYYY-MM-DD");
const getDateFromISO = (date_string) => moment(date_string).local();

const parseDynamo = (event) => {
  let new_event = { ...event };

  // Parse attributes
  new_event.num_people = +new_event.num_people;

  // Remove the 'createdAt' key from Dynamo
  const filt_evt = Object.keys(new_event)
    .filter(key => key !== 'createdAt')
    .reduce((obj, key) => { obj[key] = new_event[key]; return obj; }, {});

  return filt_evt;
}

const getDateTime = (date, time) => {
  const fmt = 'YYYY-MM-DD h:mmA';
  const formattedDateTime = moment(`${date} ${time}`, fmt).local().format();
  return new Date(formattedDateTime);
}

const getAstraTime = datetime => {
  // Sat Oct 20 2018 23:59:59 GMT-0500 (Central Daylight Time)
  const momentDate = moment(datetime).format('h:mm a');
  return momentDate;
}

const getWeekRange = date => {
  const momentDate = getDateFromISO(date);
  const weekStart  = momentDate.startOf('week').format('YYYY-MM-DD');
  const weekEnd    = momentDate.endOf('week').format('YYYY-MM-DD');

  return { weekStart, weekEnd };
}



const sixMonthsFromToday = () => {
  const today = new Date();
  const sixMonths = moment(today).add(6, 'months');
  return sixMonths.toDate();
}
const getYesterday = () => {
  const today = new Date();
  const yesterday = moment(today).local().subtract(1, 'day');
  return yesterday.toDate();
}


const isWeekend = date => {
  // Create a Moment date
  let dateObj = moment(date).local();

  // Get the day of the week from the JavaScript date object
  let day_of_week = dateObj.weekday();
  
  return ((day_of_week === 0) || (day_of_week === 6));
}

const isAfterHours = (start, end) => {
  // Convert times into MomentJS objects
  const startMoment = moment(start, 'h:mm A');
  const endMoment   = moment(end, 'h:mm A');
  
  // 17 is 5:00 pm in hours
  const closingTime = 17 
  
  // Check if either is after hours
  const startsAfterClose = startMoment.hour() >= closingTime;
  const endsAfterClose   = endMoment.hour()   >= closingTime;
  return startsAfterClose || endsAfterClose;
}


const validTimes = (start, end) => {
  try {
    const startMoment = moment(start, "h:mm A");
    const endMoment = moment(end, "h:mm A");
    return startMoment.isBefore(endMoment);
  } catch (error) {
    return false;
  }
}


const nextWeek = () => {
  /* Returns the date string of one week from function evaluation. */
  const today = new Date();
  const nextWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()+7
  );
  return nextWeek;
}

const getTimeAfterStart = start_time => {
  const start_index = times.indexOf(start_time);
  const next_time = times[start_index+1];

  return next_time;
};



/**
 * Computes a new date given the difference from a given date.
 * @param {string} date YYYY-MM-DD formatted date string.
 * @param {number} delta The difference we should compute from the given date.
 * @param {string} unit Unit of time used to compute difference, one of {'days', 'months', 'years'}.
 * @returns {string} newDate Computed date in YYYY-MM-DD format.
 */
const dateDelta = (date, delta, unit='days') => {
  const momentDate = moment(date).local();
  const newDate    = momentDate.add(delta, unit);
  return newDate.format("YYYY-MM-DD");
}


/**
 * String specifications for Office Fabric DatePicker.
 */
const datePickerStrings = {
  /*
   * Datepicker requires ALL of these to be filled out. 
   * All for just two error messages.
   */
  
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',

  isRequiredErrorMessage: 'Event Date is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};


export {
  sixMonthsFromToday,
  getYesterday,
  isWeekend,
  isAfterHours,
  validTimes,
  getDateISO,
  getDateFromISO,
  getDateTime,
  getAstraTime,
  getWeekRange,
  parseDynamo,
  getTimeAfterStart,
  nextWeek,
  dateDelta,
  datePickerStrings
};