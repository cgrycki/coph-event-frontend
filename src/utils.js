/*
 * UTILS.js
 * Collection of utility functions to assist in our scheduling app.
 */


//-----------------------------------------------------------------------------
// Validation
//-----------------------------------------------------------------------------

function validate_date(date_str) {
  /*
   * @method
   * @description
   * @param (string) date_str - Date in ISO format, YYYY-MM-DD.
   * @returns (string) validation_state - String indicating acceptability of date.
   */
  return null;
}

function validate_time(time_str) {
  /*
  * @method
  * @description
  * @param (string) time_str - Time in 24 hour format, HH:MM.
  * @returns (string) validation_state - String indicating acceptability of time.
  */
  return null;
}

function validate_email(email_str) {
  /*
  * @method
  * @description
  * @param (string) email_str - Email in str format.
  * @returns (string) validation_state - String indicating acceptability of email.
  */
  return null;
}


//-----------------------------------------------------------------------------
// Formatting
//-----------------------------------------------------------------------------








//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

function diff_date_days(date_str) {
  /*
   * @method
   * @description Method returning the difference in days between today and a date.
   * @param (string) date_str - ISO formatted date, YYYY-MM-DD.
   * @returns (int) diff_dates - Difference between dates in days.
   */
  let proposed_date = new Date(date_str);
  var today = new Date();

  let MS_PER_DAY = 1000 * 60 * 60 * 24;
  var diff_dates = Math.floor((proposed_date - today) / MS_PER_DAY);

  return diff_dates;
}

function save_drag_n_drop() {
  /*
   * @method
   * @description Attempt to save the canvas as an image.
   */

}
