/* Validations for our form */
import { isEmail, isAfter } from 'validator';


export const validateDate = (val) => {
  /* 
   * Function that takes a date string and returns a boolean
   * depending on if the input is at least one week in advance.
   */
  return isAfter(val.toDateString(), nextWeek().toDateString());
}

export const validateIowaEmail = (val) => {
  /*
   * Function that returns true if and only if is it a valid 
   * email from the @uiowa domain.
   */
  return (isEmail(val) && val.endsWith('@uiowa.edu'));
}

export const validateEmail = (val) => {
  /*
   * Function that returns true if and only if is it a valid 
   * email from the @uiowa domain.
   */
  return isEmail(val);
}