/**
 * Serliaze Store -- Loading and saving our application store to the browser's localStoreage.
 * 
 * @module serializeStore
 */

export const loadStore = () => {
  try {
    const serializedStore = localStorage.getItem('store');
    if (serializedStore === null) return undefined;
    else return JSON.parse(serializedStore);
  } catch(err) {
    return undefined;
  };
}

export const saveStore = (state) => {
  // We only want a subset of our data
  const form_info = state.fields.info;
  const room_info = state.rooms.rooms;
  //const furn_info = state.editor.

  const store = {
    'fields': form_info,
    'rooms': room_info
  };

  try {
    const serializedStore = JSON.stringify(store);
    localStorage.setItem('store', serializedStore);
  } catch(err) {
    console.log('Could not serialize application store to localStore!');
    console.log(err);
  };
}