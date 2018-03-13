# `coph-event-app`

Simple Event Scheduler Form + GUI for the College of Public Health.

#### Application Behavior

- Forms
  1. Forms should show no validation state until input/submission
  2. Submit button should be disabled until all of the required fields are validated

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


#### Next Steps

1. Ideate on editor actions
2. Create actions and creators
3. Commit
4. Create proper editor reducer
  * Create itemReducer and import it into ^^^
  * Create canvasPropReducer and do the same
5. Commit
6. Ideate on editor functions
  - items
    * onClick => add item
    * onDragEnd => update item
    * onDblClick => remove item
    * onContentClick => focus item
  - toolbar
    * Toolbar component
    * action creators for the two toolbar events
  - calculated
    * HUD component
    * actions, creators for toggle
    * reducers for calculation event
  - Layer
    * onDragMove => highlight item
  - ?onScroll? Low hanging


#### Future Work

- items
  * components

- First Floor plan
  * slimming down to svg/img
  * point/area identification
  * inclusion functions
  * scaling to different sizes
  * serialize predefined layouts

- Form Submission
  * gathering variables
  * validating all fields

- Nice
  * help button in `<FormPanel />` => modal gifs

- API
  * Get middleware/`redux-thunk` up and running
  * Intergrate express
  * Create and connect to a database
  * Create actions, functions, and intergrate Microsoft Graph API