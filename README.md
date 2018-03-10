# College of Public Health Event Application

#### Application Behavior

- Editor
  1. GUI
    - Mouseing over an item should change it's appearance 
      * (0.5 darker)
      * show outline radius (dependent on chairs per table)
      * change mouse pointer to 'hand'
    - Clicking and holding an item should change it's appearance 
      * (1 * darker)
      * change pointer to 'fist'
    - Items should change appearance on collision
      * change color (red)
      * highlight and show outline radius for intersecting items
    - Tables should not be able to be dragged/created in prohibited areas
    - single clicking an empty GUI should create the selected furniture type
      * x, y from mouse => item
      * item should be focused
    - single clicking item should focus it
      * add rotation transformer
      * change appearance to dragged
    - double clicking should remove item from GUI
      * calculations should change
      * state should be updated
  2. HUD
    Button toggle to hide most of the HUD
  3. Toolbar
    * furniture type selector button
      clicking should set the type in state
    * chairs per table selector
      * clicking should set state
      * trigger appearance and calculate new variables
