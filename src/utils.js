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

const todays_date_str = () => {
  /*
   * @method
   * @description Simple function to return current date in ISO format.
   * @returns (string) today_str - ISO formatted date.
   */
  const today = new Date();
  const today_str = today.toISOString().substring(0, 10);
  return today_str;
};


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

function calculateFurniture(state) {
  /*
   * @method
   * @description Function that does the dirty work for updating chairs/carts. 
   * @description Does not set state but instead returns a dict so the 
   * @description function can be used in multiple places.
   * @param {dict} state - Our applications state. 
   */
  // Gather variables from our state
  let forms = state.forms,
      calcd = state.calculated,
      furns = state.furniture,
      ChairsPerTable = forms.ChairsPerTable;

  // Calculate the chairs and number of carts we'll need.
  calcd['Chairs']         = furns.Circular * ChairsPerTable;
  calcd['ChairCarts']     = Math.ceil(calcd.Chairs/ 48);
  calcd['CircleCarts']    = Math.ceil(furns.Circular / 6);
  calcd['RectangleCarts'] = Math.ceil(furns.Rectangular / 6),
  calcd['BarCarts']       = Math.ceil(furns.Bar / 6);

  return calcd;
}


function saveCanvasObj(obj) {
  /*
   * @method
   * @description Function to save the Base64 encoded canvas.
   * @param {Object} obj - Konva canvas object.
   * @returns {string} editorURL - Base64 encoded PNG.
   */
  let editorURL = obj.toDataURL();
  return editorURL;
}

function saveCanvasEvent(event) {
  /*
   * @method
   * @description Function to save the Base64 encoded canvas.
   * @param {event} event - Event from the browser
   * @returns {string} editorURL - Base64 encoded PNG.
   */
  let editorStage = event.currentTarget;
  let editorURL = editorStage.toDataURL();
  return editorURL;
}



function handleFormChange(event) {
  /*
  * @method
  * @description Function to update our form's state on input change.
  * @param (event) event - Event triggered by input value change.
  * @returns none - State is updated by name of input group.
  */
  const target = event.target;
  const value  = target.value;
  const name = target.name;

  // Update the correct form value
  let forms    = this.state.forms;
  forms[name]  = value;

  // If the input was 'radio', update our calculations
  if (target.type === 'radio') {
    let int_value = parseInt(value, 10);
    forms[name] = int_value;

    let calculated = calculateFurniture(this.state);
    this.setState({ calculated });
  }

  this.setState({ forms });
}

function handleFormSubmit(event) {
  /*
   * @method
   * @description 
   * @param (event) event - 
   * @returns (null) - 
   */
  console.log(event);
  event.preventDefault();

  // Validation at the point in time
    // - Date(>= 7 days in the future)
    // - Email validation
    // - Any(Furniture.items) !== 0
  

  // Set the appropriate warnings on the fields

  // If everything is good, then send off an AJAX POST.

  console.log(this.state);
}

function handleDragEnd(event) {
  /*
   * @method
   * @description Updates our layout state when a movement has been made.
   * Attaches to the stage, and on drag end takes a snapshot.
   */
  let editorStage = event.currentTarget;
  let editorURL = editorStage.toDataURL();
  this.setState({ editorURL });

  console.log(this.state);
}

export { todays_date_str, calculateFurniture, handleFormChange, handleFormSubmit, handleDragEnd };