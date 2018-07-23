/**
 * Action creators for our fields
 */
import { fieldActions } from '../constants/actionTypes';


/**
 * Updates a field with user's entered information.
 * @param {string} field Key of field to update
 * @param {} value User HTML data
 */
export const updateField = (field, value) => ({
  type: fieldActions.UPDATE_FIELD,
  field: field,
  value: value
})


/**
 * Resets a field to it's initial state.
 * @param {string} field String representation of field key we should reset
 */
export const resetField = (field) => ({
  type: fieldActions.RESET_FIELD,
  field: field
})
