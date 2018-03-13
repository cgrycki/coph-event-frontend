export const calculateBusinessLogic = (furn_items, chairs) => {
  /*
   * @method
   * @description Function that returns the counts of the furniture items.
   * @returns Computes number of people that can be seated, item counts, + carts.
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

export const canvasClickEvent = (event) => {
  /*
   * @method
   * @description Method that ~only~ returns (x, y) mouse pos. Cancels event bubbling.
   * @param {event} - Fired by clicking on Konva Stage.
   * @returns {x: xMousePos, y: yMousePose}
   */
  event.cancelBubble = true;
  let canvas = event.currentTarget;
  let mousePos = canvas.getPointerPosition();
  return mousePos;
}

export const getClickedShapeAttrs = (event) => {
  /*
   * @method
   * @description Get the X, Y, and furniture type of a clicked Konva shape.
   * @param {event} - Event fired from an onClick() event.
   * @returns {x, y, furn_type} of clicked shape.
   */
  event.cancelBubble = true;
  let shape = event.currentTarget;
  let shapeAttrs = shape.getAttrs();

  return {
    x: shapeAttrs.x,
    y: shapeAttrs.y,
    furn_type: shapeAttrs.name,
    item_id: shapeAttrs.id
  }; 
}