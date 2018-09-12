/** ~~Mathemagic~~ */
export function computeFurnitureCounts(counts, chairs_per_table) {
  // Returns the min. amount of racks needed to accomodate n items.
  const getRackCnt  = (itemCnt, rackCapac) => {
    const quotient  = Math.floor(itemCnt / rackCapac);
    const remainder = itemCnt % rackCapac;
    
    // If we have any remainders, add a rack to the count
    const rackCnt   = (remainder > 0) ? quotient + 1 : quotient;
    return rackCnt;
  }

  // Number of chairs: # free chairs + table chairs; racks hold 48 chairs
  const chair       = counts.chair + (chairs_per_table * counts.circle);
  const chair_racks = getRackCnt(chair, 48);

  // Circle tables: racks hold 6
  const circle = counts.circle;
  const circle_racks = getRackCnt(circle, 6);

  // Rectangular tables: racks hold 6
  const rect = counts.rect;
  const rect_racks = getRackCnt(rect, 6);

  // Cocktail-height tables: 
  const cocktail = counts.rect;
  const cocktail_racks = getRackCnt(cocktail, 10);

  // Display boards have no racks
  const display = counts.display;

  // Same with trash cans
  const trash = counts.trash;

  return {
    chair,
    chair_racks,
    circle,
    circle_racks,
    rect,
    rect_racks,
    cocktail,
    cocktail_racks,
    display,
    trash
  };
}