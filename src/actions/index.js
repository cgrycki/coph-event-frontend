/*
 * Actions
 */

import { updateForm } from './form.action';
import { incrementId } from './id.action';
import { addFurnItem,  updateFurnItem, removeFurnItem } from './item.action';
import { updatedCalculated } from './calc.action';

const testUpdateAction = 'TEST_UPDATE_ACTION';
const testUpdate = () => ({type: testUpdateAction});

export { updateForm, incrementId, addFurnItem, updateFurnItem, removeFurnItem }