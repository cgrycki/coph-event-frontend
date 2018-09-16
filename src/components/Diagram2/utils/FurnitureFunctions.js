import { Easings } from 'konva';
import CollisionFunctions from './CollisionFunctions';


export default class FurnitureFunctions {
  /**
   * Returns the Euclidean distance between two points.
   * @param {number} x1 Point 1 x
   * @param {number} y1 Point 1 y
   * @param {number} x2 Point 2 x
   * @param {number} y2 Point 2 y
   * @returns {number} distance Distance in pixels between two points.
   */
  static pointDistance({x: x1, y: y1}, {x: x2, y: y2}) {
    return Math.sqrt(
      Math.pow((x2 - x1), 2) +
      Math.pow((y2 - y1), 2)
    );
  }

  static getNodeCollision(node) {

    //console.log(node.position(), node.getAbsolutePosition())
    //CollisionFunctions.getNodeAttrs(node);
    if (node.getName() === 'circle') {
      console.log(CollisionFunctions.getCircleTableSAT(node));
    }



    let collisionFlag = false;

    const stage     = node.getStage();
    const itemLayer = stage.findOne('.itemLayer');
    const pos       = node.position();

    // Dragged furniture type
    const draggedType = node.getName();

    // Check if we're colliding with any node 
    if (itemLayer.getIntersection(pos) !== null) collisionFlag = true;
    else {
      itemLayer.children.each((group) => {
        if (group === node) {
          console.log('dragged node evaluated itself');
          return true;
        }
        // Don't evaulate collisions for items that are far away
        const otherPos = group.position();
        const d = this.pointDistance(pos, otherPos);

        // Other item
        const otherType = group.getName();
        if ((draggedType === 'circle') && (otherType === 'circle')) {
          console.log(CollisionFunctions.getFurnitureCollision(node, group));
        }


        //if (d < 40) collisionFlag = true;
      });
    }

    return collisionFlag;
  }

  static getNodeOutOfBounds(node) {
    const stage = node.getStage();
    const pos   = node.position();
    const intersectsWith = stage.getIntersection(pos, '.FLOOR_GOOD');
    const outOfBounds = intersectsWith === null;

    return outOfBounds;
  }

  static handleDragStart(node, dragEvt) {
    // move to top?
    
    // Set collision to false to stop interference from prior drags
    node.setAttr('collision', true);
    node.setAttr('dragging', true);

    // Store the last known good coordinates in the canvas node.
    const { x, y } = node.getAttrs();
    node.setAttr('dragStartX', x);
    node.setAttr('dragStartY', y);

    // Set shadow for dragged object
    const furnItem = node.findOne('.furnItem');
    furnItem.shadowBlur(4);
    furnItem.shadowColor('rgba(0, 0, 0, 0.3)');
    //furnItem.offsetX(2);
    //furnItem.offsetY(1);

  }

  static handleDragMove(node, dragEvt) {
    // Update the node's collision attribute by checking collisions + bounds
    const colliding   = this.getNodeCollision(node);
    const outOfBounds = this.getNodeOutOfBounds(node);
    node.setAttr('collision', (colliding || outOfBounds));

    // Change cursor if there's a collision
    //const container = node.getStage().container();
    //if (collisionFlag) container.style.cursor = 'no-drop';
    //else container.style.cursor = 'move';

    // Update the store's node information
    const { x, y, rotation: rot, id, name: furn } = node.getAttrs();
    return { id, furn, x, y, rot };
  }

  static handleDragEnd(node, dragEvt) {
    const {
      collision, id, name: furn, rotation: rot,
      dragStartX, dragStartY, x: dragEndX, y: dragEndY
    } = node.getAttrs();

    // Reset node's appearance/attributes
    const furnItem = node.findOne('.furnItem');
    furnItem.shadowBlur(0);
    node.setAttr('dragging', false);
    node.getLayer().batchDraw();


    let resetFlag = false;
    // Check for collisions from drag event
    if (collision === true)               resetFlag = true;
    // Check if this node is colliding with other furniture
    else if (this.getNodeCollision(node)) resetFlag = true;
    // Check if node is outside acceptable area
    else if (this.getNodeOutOfBounds(node)) resetFlag = true;
    
    // Change cursor back to normal
    //const container = node.getStage().container();
    //if (resetFlag) container.style.cursor = 'pointer';
    //else container.style.cursor = 'move';

    const dragEndAttributes = {
      x: resetFlag ? dragStartX : dragEndX,
      y: resetFlag ? dragStartY : dragEndY,
      rot, id, furn
    };

    // Return a promise to deal with the async
    if (resetFlag) {
      return new Promise(function(resolve, reject) {
        // Reset interaction attrs.
        node.setAttr('collision', false);

        node.to({
          x       : dragStartX,
          y       : dragStartY,
          duration: 0.3,
          easing  : Easings.StrongEaseIn,
          onFinish: () => resolve(dragEndAttributes)
        });
      });
    } else return new Promise((resolve, reject) => resolve(dragEndAttributes));
  }
}