/**
 * Holds our popup's notification messages.
 * 
 * Popup.js expects the following properties
 *  - isVisible
 *  - yes button onClick event
 *  - no button onClick event
 *  - *title*
 *  - *subText*
 *  - *Yes button text*
 *  - *No button text*
 */

const messages = {
  submit: {
    title: "Event Submission",
    subText: "After you submit your form, it will be entered in the University of Iowa Workflow system for approval by an administrator.",
    btnTextYes: "Submit",
    btnTextNo: "Edit Event"
  },
  submitted: {
    title: "Event Submission ⏳ ",
    subText: "",
    btnTextYes: "Submit",
    btnTextNo: "Edit Event",
    message: "Submitting..."
  },
  success: {
    title: "Event Submission 🎉 ",
    subText: "",
    btnTextYes: "Create another event",
    btnTextNo: "View Event",
    message: "Success! Your event was successfully created. Check your email, you'll be getting a confirmation shortly."
  },
  edit  : {
    title: "Are you sure you want to edit this event?",
    subText: "This will clear any unsaved progress in the Event Creation form.",
    btnTextYes: "Edit Event",
    btnTextNo: "Cancel"
  },
  delete: {
    title: "Are you sure you want to delete this event?",
    subText: "This will remove the event from Workflow, and can not be undone.",
    btnTextYes: "Yes, delete this event",
    btnTextNo: "Cancel"
  },
  error : {
    title: "We're sorry...",
    subText: "There was an error while processing your request.",
    btnTextYes: "Retry",
    btnTextNo: "Close"
  }
};

export default messages;