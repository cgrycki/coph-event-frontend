/* Actions to update our input form. */
import { formActions } from '../constants/actionTypes';

export const updateForm = (name, value) => ({
  type: formActions.UPD_FORM,
  name: name,     // Our form variable to be updating
  value: value    // Value of HTML input
});

export const submitForm = (props) => ({
  type         : formActions.SUBMIT_FORM,
  eventName    : props.eventName,
  eventDate    : props.eventDate,
  eventTime    : props.eventTime,
  eventComments: props.eventComments,
  userEmail    : props.userEmail,
  calculated   : props.calculated,
  URI          : props.URI
})