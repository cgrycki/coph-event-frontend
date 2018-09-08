/**
 * Nav[igation] Actions
 * Serves as a wrapper for a series of action dispatchers.
 */

import {push}               from 'connected-react-router/lib/actions';
import {parseDynamo}        from '../utils/date.utils';
import {
  populateEventInfo,
  setEventFetch,
  fetchEventReset
}  from './event.actions';
import {
  populateFieldInfo,
  submitFormReset
}  from './form.actions';
import {populateEditor}     from './diagram.actions';


/** 
 * Populates an event and then dispatches navigation to the event page for viewing.
 * @param {Object} item Event and permissions object from our store's events [].
 * @param [item.evt] {Object} - Event information submitted by user.
 * @param [item.permissions] {Object} - Event permissions from Workflow. 
 */
export const populateEventAndPush = ({event, permissions, items=[]}) => (dispatch) => {
  const formattedInfo = parseDynamo(event);                       // Format Dynamo object
  dispatch(populateEventInfo(formattedInfo, permissions, items)); // Populate Event Page info
  dispatch(fetchEventReset());                                    // Reset event page loading+error+success
  dispatch(setEventFetch(false));                                 // Disable retrieving event because we've loaded it
  dispatch(push(`/event/${event.package_id}`));                   // Route to the event so user can view
}


/**
 * Populates field information for an event and then dispatches a routing action.
 */
export const populateFormAndPush = (info, items=[]) => (dispatch) => {
  // Field Information
  const formattedInfo = parseDynamo(info);    // Format Dynamo object
  dispatch(populateFieldInfo(formattedInfo)); // Populate form infomation

  // Layout information
  dispatch(populateEditor(items));            // Populate diagram items

  // Form REST
  dispatch(submitFormReset());                // Reset the form submission loading+error+success
  dispatch(push("/form/user"));               // Route to form so user can edit
}