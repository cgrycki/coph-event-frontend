/**
 * Nav[igation] Actions
 * Serves as a wrapper for a series of action dispatchers.
 */
import {push}               from 'connected-react-router/lib/actions';
import {parseDynamo}        from '../utils/date.utils';
import {
  getEvents,
  populateEventInfo,
  setFetchEvents,
  fetchEventReset
}  from './event.actions';
import {
  populateFieldInfo,
  clearFieldInfo,
  submitFormReset,
  updateField
}  from './form.actions';
import {
  populateEditor,
  clearEditor
}   from './diagram.actions';
import {
  fetchLogin
} from './app.actions';


/** 
 * Populates an event and then dispatches navigation to the event page for viewing.
 * @param {Object} item Event and permissions object from our store's events [].
 * @param [item.evt] {Object} - Event information submitted by user.
 * @param [item.permissions] {Object} - Event permissions from Workflow.
 * @param [item.layout] {Object} - Layout information object containing items and C.P.T.
 */
export const populateEventAndPush = ({ event, permissions, layout }) => dispatch => {
  const formattedInfo = parseDynamo(event);                         // Format Dynamo object
  dispatch(populateEventInfo(formattedInfo, permissions, layout));  // Populate Event Page info
  dispatch(fetchEventReset());                                      // Reset event page loading+error+success
  dispatch(setFetchEvents(false));                                  // Disable retrieving event because we've loaded it
  dispatch(push(`/event/${event.package_id}`));                     // Route to the event so user can view
}


/**
 * Clears form fields, resets REST, and navigates to form page.
 */
export const clearFormAndPush = () => dispatch => {
  dispatch(clearFieldInfo());   // Set the form to default
  dispatch(clearEditor());      // Clear items from editor
  dispatch(submitFormReset());  // Reset the REST status of form
  dispatch(push('/form/user')); // Navigate to the form.
}


/**
 * Populates the diagram with items before clearing/resetting form for another
 * event.
 * @param {object} layout Layout object from an event
 */
export const applyDiagramLayoutAndPush = layout => dispatch => {
  dispatch(clearFormAndPush());
  dispatch(populateEditor(layout));
  dispatch(updateField('room_number', 'XC100'));
}


/**
 * Populates field information for an event and then dispatches a routing action.
 */
export const populateFormAndPush = (info, layout) => dispatch => {
  // Field Information
  const formattedInfo = parseDynamo(info);    // Format Dynamo object
  dispatch(populateFieldInfo(formattedInfo)); // Populate form infomation
  dispatch(populateEditor(layout));            // Populate diagram items and CPT
  dispatch(submitFormReset());                // Reset the form submission loading+error+success
  dispatch(push("/form/user"));               // Route to form so user can edit
}


/**
 * Populated form information for an event and then dispatches a route to the
 * diagram page.
 * @param {object} info Event field information object.
 * @param {object[]} items Event furniture item array. 
 */
export const populateDiagramAndPush = (info, layout) => dispatch => {
  // Populate the form
  const formattedInfo = parseDynamo(info);
  dispatch(populateFieldInfo(formattedInfo));
  dispatch(populateEditor(layout));
  dispatch(submitFormReset());
  dispatch(push("/form/layout"));
}


/**
 * Dispatches actions upon page start. This takes advantage of our
 * 'thunks', or Promises for the Redux store. Our REST actions return a Promise
 * which resolves with a dispatching action depending on the REST call status.
 * We can chain these together to create 'higher order actions'. 
 */
export const appSetup = () => (dispatch, getState) => {
  // Authenticate users session first
  dispatch(fetchLogin())
    .then(resolvedAction => {
      if (resolvedAction.type === 'LOGIN_SUCCESS' &&
          resolvedAction.payload.loggedIn) dispatch(getEvents());
    });
}