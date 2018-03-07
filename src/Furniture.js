/*
 * UTILS.js
 * Collection of utility functions to assist in our scheduling app.
 */
import Konva from 'konva';
import { calculateFurniture } from './utils';

//-----------------------------------------------------------------------------
// Furniture Objects
//-----------------------------------------------------------------------------

function furnitureBase(x, y, type) {
  let base_group = new Konva.Group({
    x: x,
    y: y,
    name: type,
    draggable: true
  });

  base_group.on("dragstart", function() {
    this.moveToTop();
    this.draw();
  });

  base_group.FILL_COLOR = '#dddddd';
  base_group.STROKE_COLOR = '#000000';
  base_group.STROKE_WIDTH = 4;

  return base_group;
};

function circleTable(x, y) {
  let type = 'Circular';
  let base = furnitureBase(x, y, type);
  let table = new Konva.Circle({
    radius:       20,
    fill:         base.FILL_COLOR,
    stroke:       base.STROKE_COLOR,
    strokeWidth:  base.STROKE_WIDTH,
    name:         type
  });
  base.add(table);
  
  return base;
}

function rectangleTable(x, y) {
  let type = 'Rectangular';
  let base = furnitureBase(x, y, type);
  let table = new Konva.Rect({
    width:        50,
    height:       25, 
    fill:         base.FILL_COLOR,
    stroke:       base.STROKE_COLOR,
    strokeWidth:  base.STROKE_WIDTH,
    name:         type
  });
  base.add(table);
  
  return base;
}

function barStool(x, y) {
  let type = 'Bar';
  let base = furnitureBase(x, y, type);
  let table = new Konva.Circle({
    radius:       12,
    fill:         '#666666',
    stroke:       base.STROKE_COLOR,
    strokeWidth:  base.STROKE_WIDTH - 2,
    name:         type
  });
  base.add(table);

  return base;
}

//-----------------------------------------------------------------------------
// Events
//-----------------------------------------------------------------------------
function canvasContentClick(event) {
  /*
   * @method
   * @description Handles content being clicked in our editor.
   * @
   */
  let canvas = event.currentTarget,
      mouse_pos = canvas.getPointerPosition(),
      is_intersect = canvas.getIntersection(mouse_pos);

  let sel_furniture = is_intersect.getAttr('name'),
      parent = is_intersect.parent;

  parent.destroy();
  canvas.draw();

  // Update our furniture counts
  let furniture = this.state.furniture;
  furniture[sel_furniture] -= 1;

  // Calculate our new values for chairs/carts
  let calculated = calculateFurniture(this.state);
  
  this.setState({ furniture, calculated });

  console.log('content click', is_intersect);
}

function canvasEmptyClick(event) {
  /*
   * @method
   * @description Handles content being clicked in our editor.
   * @
   */
  console.log('empty click');

  // Gather variables to add an item to our inventory
  let canvas = event.currentTarget;
  let mouse_pos = canvas.getPointerPosition();
  let is_intersect = canvas.getIntersection(mouse_pos);
  if (is_intersect) return null;

  let sel_furniture = this.state.forms.SelectedFurniture;

  // Update the furniture counts
  let furniture = this.state.furniture;
  furniture[sel_furniture] += 1;

  // Calculate the new values for chairs + carts
  let calculated = calculateFurniture(this.state);
  this.setState({ furniture, calculated });

  // Create the new item on the canvas
  let new_table = null;
  switch(sel_furniture) {
    case 'Circular':
      new_table = circleTable(mouse_pos.x, mouse_pos.y);
      break;
    case 'Rectangular':
      new_table = rectangleTable(mouse_pos.x, mouse_pos.y);
      break;
    case 'Bar':
      new_table = barStool(mouse_pos.x, mouse_pos.y);
      break;
    default:
      new_table = circleTable(mouse_pos.x, mouse_pos.y);
      break;
  }

  canvas.children[1].add(new_table);
  canvas.draw();
}



export { canvasContentClick, canvasEmptyClick };