export const isWeekend = date => {
  // Create a JS date
  let dateObj = new Date(date);

  // Get the day of the week from the JavaScript date object
  let day_of_week = dateObj.getDay();
  
  return (day_of_week === 6) || (day_of_week === 0);
}

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