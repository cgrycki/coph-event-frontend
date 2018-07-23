/* Validations for our form */
import { isEmail, isAfter } from 'validator';

export const nextWeek = () => {
  /* Returns the date string of one week from function evaluation. */
  const today = new Date();
  const nextWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()+7
  );
  return nextWeek;
}

export const validateDate = (val) => {
  /* 
   * Function that takes a date string and returns a boolean
   * depending on if the input is at least one week in advance.
   */
  return isAfter(val.toDateString(), nextWeek().toDateString());
}

export const validateEmail = (val) => {
  /*
   * Function that returns true if and only if is it a valid 
   * email from the @uiowa domain.
   */
  console.log(val);
  return (isEmail(val) && val.endsWith('@uiowa.edu'));
}

export const datePickerStrings = {
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

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',

  isRequiredErrorMessage: 'Event Date is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};