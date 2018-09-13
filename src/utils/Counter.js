/**
 * Counter.js
 * @author Ryan Larson
 * Furniture counter class. Counts furn items, computes racks needed, and 
 * reassigns furniture item id's.
 */


export default class Counter {

  /**
   * Returns an object containing the count of furn items of type [furn].
   */
  static getFurnItemCount(items) {
    let counts = {circle: 0, chair: 0, rect: 0, display: 0, cocktail: 0, trash: 0};
    items.forEach(item => {
      if (!(item.furn in counts)) counts[item.furn] = 1;
      else counts[item.furn] += 1;
    });
    return counts;
  }

  /**
   * Returns the minimum amount of racks needed to accomadate N number of items.
   * @param {number} itemCnt Number of furniture items.
   * @param {number} rackCnt Number of items a rack can hold.
   * @returns {number} racksNeeded
   * @private
   */
  static _getFurnRackCount(itemCnt, rackCnt) {
    if (itemCnt === 0) return 0;

    const quotient  = Math.floor(itemCnt / rackCnt);
    const remainder = itemCnt % rackCnt;
    
    // If we have any remainders, add a rack to the count
    const racksNeeded = (remainder > 0) ? quotient + 1 : quotient;
    return racksNeeded;
  }

  /**
   * Returns a counter of furntiure items and racks
   * @param {object} rawCounts Object with furn type counts.
   * @param {number} chairs_per_table Number of chairs per table: {6 | 8}.
   */
  static getFurnRackCounts(rawCounts, chairs_per_table) {
    const counts = Object.assign({}, rawCounts);
    const racks  = [
      {furn: 'circle', capac: 6},
      {furn: 'rect', capac: '6'},
      {furn: 'cocktail', capac: 10},
      {furn: 'chair', capac: 48} 
    ];

    // Add the number of chairs we'll need to accomodate the circular tables
    counts.chair = counts.chair + (counts.circle * chairs_per_table);

    // For each rack, get the number we need according to the items in our count.
    racks.forEach(rack => {
      if (counts[rack.furn] === 0) counts[`${rack.furn}_racks`] = 0;
      else counts[`${rack.furn}_racks`] = this._getFurnRackCount(counts[rack.furn], rack.capac);
    });

    return counts;
  }

  /**
   * Assigns fresh IDs from a saved event.
   */
  static assignFurnitureIDs(items) {
    // Count em up
    const counts = this.getFurnItemCount(items);
  
    // Create a copy because we'll be 'destroying' counter obj while decrementing
    let copyCounts = Object.assign({}, counts);

    const reassignedIDs = items.map(item => {
      // Decrement counter before assigning id to account for index starting @ 0.
      copyCounts[item.furn] -= 1;

      const newID = item.furn + copyCounts[item.furn];
      let newObject = Object.assign({}, item);
      newObject.id = newID;
      return newObject;
    });

    return reassignedIDs;
  }
}