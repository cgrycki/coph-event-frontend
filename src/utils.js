/*
 * UTILS.js
 * Collection of utility functions to assist in our scheduling app.
 */
import Konva from 'konva';

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

function calculateFurniture() {

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
  const name   = target.name;

  let forms    = this.state.forms;
  forms[name] = value; // Update the correct form value
  this.setState({ forms });

  console.log(forms, this.state);
}

function handleFormSubmit(event) {
  /*
   * @method
   * @description 
   * @param (event) event - 
   * @returns (null) - 
   */
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

function canvasContentClick(event) {
  /*
   * @method
   * @description Handles content being clicked in our editor.
   * @
   */
  let canvas = event.currentTarget,
      mouse_pos = canvas.getPointerPosition(),
      is_intersect = canvas.getIntersection(mouse_pos);

  let sel_furniture = is_intersect.getAttr('name'),
      parent = is_intersect.parent;

  parent.destroy();
  canvas.draw();

  let furniture = this.state.furniture;
  furniture[sel_furniture] -= 1;
  this.setState({ furniture });

  console.log('content click', is_intersect);
}

function canvasEmptyClick(event) {
  /*
   * @method
   * @description Handles content being clicked in our editor.
   * @
   */
  console.log('empty click');

  // Gather variables to add an item to our inventory
  let canvas = event.currentTarget;
  let mouse_pos = canvas.getPointerPosition();
  let is_intersect = canvas.getIntersection(mouse_pos);
  if (is_intersect) return null;

  let sel_furniture = this.state.forms.SelectedFurniture;

  // Update the count and calculate new variables
  let furniture = this.state.furniture;
  furniture[sel_furniture] += 1;

  this.setState({ furniture });


  function make_table(x, y) {
    let group = new Konva.Group({
      x: x,
      y: y,
      draggable: true
    });
  
    let table = new Konva.Circle({
      radius: 20,
      fill: '#dddddd',
      stroke: '#000000',
      strokeWidth: 4,
      name: 'Circular'
    });
  
    group.on("dragstart", function () {
      this.moveToTop();
      this.draw();
    });
  
    group.add(table);
    return group;
  };
  let newTable = make_table(mouse_pos.x, mouse_pos.y);
  canvas.children[0].add(newTable);
  canvas.draw();

}

export { todays_date_str, handleFormChange, handleFormSubmit, handleDragEnd, canvasContentClick, canvasEmptyClick };