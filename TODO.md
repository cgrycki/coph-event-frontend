# @TODO


========================================================================
== Redux
========================================================================
- remove counter side effect from the add/remove reducer case
- add a case for count action
- add a action function to dispatch adding+/-removing an item and updating the counts
- refactor GUI and rename 
  * updateEditor() to updateEditorLayout()
  * addItem() => addItemAndUpdate()
  * removeItem() => removeItemAndUpdate()


actions/creators/reducers, and REST POST to include the rotation and chairs per table.



- Add paths for 6 and 8 chairs to the Furniture functions
- Create a react component and move CircleFurn to a Layers like component
- link up the rotation transformer to the furniture items
- ensure rotation updates.

- modify the schema to accept rotation, and chairs_per_table.
- modify layouts route/middleware/model to return an object instead of { items: [] }


- modify the review component/props/callback
- submit a test post


***** getEvents() action creator
add an is_admin flag and conditionally change the URI

========================================================================
== Nice to have
========================================================================
- Hook up HUD to the counts.
- Add a download button to the viewer page
- 