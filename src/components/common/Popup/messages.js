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
    btnTextYes: "Submit Event",
    btnTextNo: "Go Back"
  },
  submitted: {
    title: "Event Submission ⏳ ",
    subText: "",
    btnTextYes: "Submitting...",
    btnTextNo: "Go Back",
    message: "Submitting..."
  },
  success: {
    title: "Event Submission 🎉 ",
    subText: "",
    btnTextYes: "Create another event",
    btnTextNo: "View Event",
    message: "Success! Your event was successfully created. Check your email, you'll be getting a confirmation shortly."
  },
  error : {
    title: "We're sorry...",
    subText: "",
    btnTextYes: "Retry",
    btnTextNo: "Close",
    message: "There was an error while processing your request."
  },
  edit  : {
    title: "Are you sure?",
    subText: "Editing an event will clear any unsaved progress in the Event Creation form.",
    btnTextYes: "Yes, edit this event",
    btnTextNo: "Go Back"
  },
  delete: {
    title: "Are you sure?",
    subText: "Are you sure you want to delete this event? Deleting an event will remove the event from Workflow, and can not be undone.",
    btnTextYes: "Yes, delete this event",
    btnTextNo: "Go Back"
  },
  deleting: {
    title: "Delete Event ⏳",
    subText: "",
    btnTextYes: "Yes, delete this event",
    btnTextNo: "Go Back",
    message: "Deleting..."
  },
  deleted: {
    title: "Delete Event ✔️",
    subText: "",
    btnTextYes: "Yes, cancel this event",
    btnTextNo: "Go Back",
    message: "Event deleted!"
  }
};

export default messages;