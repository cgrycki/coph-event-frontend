export const calculateBusinessLogic = (furn_items, chairs) => {
  /*
   *
   */
  // Furniture counts
  const numCircles = furn_items.circle.length;
  const numRects = furn_items.rect.length;
  const numBars = furn_items.bar.length;
  const numPosters = furn_items.poster.length;
  const numTrashs = furn_items.trash.length;

  // Each circle cart holds 6 circlular tables.
  const numCircleCarts = Math.ceil(numCircles / 6);

  // Numbers of chairs determined by how many people are sitting at circle
  // tables. In addition each circle table will have a number of chairs, thus...
  const numChairs = numCircles * chairs;
  
  // Each chair cart holds 48 chairs.
  const numChairCarts = Math.ceil(numChairs / 48);

  // Same for rectangular tables.
  const numRectCarts = Math.ceil(numRects / 6);

  // Bar tables hold 12.
  const numBarCarts = Math.ceil(numBars / 12);

  return {
    numChairs,
    numChairCarts,
    numCircles,
    numCircleCarts,
    numRects,
    numRectCarts,
    numBars,
    numBarCarts,
    numPosters,
    numTrashs
  };
};

export const getHUDCalc = (calculatedBusinessLogic) => {
  /* Extracts relevent numbers for users to view. */
  const { numChairs, numCircles, numRects, 
        numBars, numPosters, numTrashs } = calculatedBusinessLogic;
  return { numChairs, numCircles, numRects, numBars, numPosters, numTrashs };
}
