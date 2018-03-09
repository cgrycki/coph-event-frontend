/*
 * Actions
 */

import { updateForm } from './form.action';
import { incrementId } from './id.action';
import { addFurnItem,  updateFurnItem, removeFurnItem } from './item.action';
import { updatedCalculated } from './calc.action';

export const testUpdateAction = 'TEST_UPDATE_ACTION';
export const testUpdate = () => ({type: testUpdateAction});