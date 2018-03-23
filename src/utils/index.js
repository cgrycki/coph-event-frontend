import { validateDate, validateEmail, nextWeek, datePickerStrings } from './form.utils';


export const calculateBusinessLogic = (furn_items, chairs) => {
  /*
   * @method
   * @description Function that returns the counts of the furniture items.
   * @returns Computes number of people that can be seated, item counts, + carts.
   */
  const countTypes = (furn_items, furn_type) => furn_items.filter(d => d.furn_type === furn_type).length;

  // Furniture counts
  const numCircles = countTypes(furn_items, 'circle');
  const numRects = countTypes(furn_items, 'rect');
  const numBars = countTypes(furn_items, 'bar');
  const numPosters = countTypes(furn_items, 'poster');
  const numTrashs = countTypes(furn_items, 'trash');

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

export const canvasClickPos = (event) => {
  /*
   * @method
   * @description Method that ~only~ returns (x, y) mouse pos. Cancels event bubbling.
   * @param {event} - Fired by clicking on Konva Stage.
   * @returns {x: xMousePos, y: yMousePose}
   */
  event.evt.preventDefault();
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
  event.evt.preventDefault();
  event.cancelBubble = true;

  let shape = event.currentTarget.clickEndShape.parent;
  let shapeAttrs = shape.getAttrs();

  return {
    x: shapeAttrs.x,
    y: shapeAttrs.y,
    furn_type: shapeAttrs.name,
    item_id: shapeAttrs.id
  }; 
}

export const getDragShapeAttrs = (event) => {
  /*
   * @method
   * @description Get the X, Y, and furniture type of a dragged Konva shape.
   * @param {event} - Event fired from an onDrag() event.
   * @returns {x, y, furn_type} of dragged shape.
   */
  event.evt.preventDefault();
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

export const haveIntersection = (r1, r2) => {
  /*
   * 
   */
  return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
  );
}

export const changePointer = (pointerType) => document.body.style.cursor = pointerType;

export { validateDate, validateEmail, nextWeek, datePickerStrings };