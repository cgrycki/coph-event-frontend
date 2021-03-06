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

  /**
   * Checks for a shape overlap with all furniture items within 40px of current
   * node. Returns true if any overlap is found, false otherwise.
   */
  static getNodeCollision(node) {
    let collisionFlag = false;

    const stage     = node.getStage();
    const itemLayer = stage.findOne('.itemLayer');
    const pos       = node.position();

    // Check if we're colliding with any node 
    if (itemLayer.getIntersection(pos) !== null) collisionFlag = true;
    else {
      itemLayer.children.each((other) => {
        if (other === node) {
          console.log('dragged node evaluated itself');
        } else {
          // Don't evaulate collisions for items that are far away
          const d = this.pointDistance(pos, other.position());

          // If we're close enough to another furniture item, evaulate the shape
          // collision. If it's true then set the flag
          if (d < 40) {
            if (CollisionFunctions.getFurnitureCollision(node, other)) collisionFlag = true;
          };
        }
      });
    }

    return collisionFlag;
  }

  /** 
   * Checks if the stage's pointer position (drag event position) is not 
   * intersecting with the good furniture area.
   */
  static getNodeOutOfBounds(node) {
    const stage          = node.getStage();
    const posStage       = stage.getPointerPosition();
    const intersectsWith = stage.getIntersection(posStage, '.FLOOR_GOOD');
    const outOfBounds    = intersectsWith === null;
    return outOfBounds;
  }

  /** Sets the initial drag position and 'shadow' on the dragged KonvaJS node.*/
  static handleDragStart(node, dragEvt) {
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
  }

  /** Updates node's collision attribute by checking collisions + out of bounds */
  static handleDragMove(node, dragEvt) {
    const colliding   = this.getNodeCollision(node);
    const outOfBounds = this.getNodeOutOfBounds(node);

    // Evaulates to true if either or both of the conditions are met.
    node.setAttr('collision', (colliding || outOfBounds));

    // Change cursor if there's a collision
    const container = node.getStage().container();
    if (node.getAttr('collision')) container.style.cursor = 'no-drop';
    else container.style.cursor = 'grabbing';

    // Update the store's node information
    const { x, y, rotation: rot, id, name: furn } = node.getAttrs();
    return { id, furn, x, y, rot };
  }

  /** Checks node collision and returns non-colliding coordinates. */
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

  /** Sets initial rotation degrees and 'shadow' on the transformed KonvaJS node. */
  static handleTransformStart(node, transformEvt) {
    // Set node collision to false to stop interference from prior transformations
    node.setAttr('collision', false);

    // Grab the last known good degrees
    const rotation = node.rotation();
    node.setAttr('rotateStart', rotation);

    // Set shadow for transformed object
    const furnItem = node.findOne('.furnItem');
    furnItem.shadowBlur(4);
    furnItem.shadowColor('rgba(0, 0, 0, 0.3)');
  }

  /** Update node's collision attribute by checking collisions on rotation. */
  static handleTransformRotate(node, transformEvt) {
    const collision = this.getNodeCollision(node);
    node.setAttr('collision', collision);

    // Update the store's node information
    const { x, y, rotation, id, name: furn } = node.getAttrs();
    const rot = Math.round(rotation);
    return { id, furn, x, y, rot };
  }

  /** Checks node collisions and returns non-colliding rotation degrees. */
  static handleTransformEnd(node, transformEvt) {
    // Get current attributes of Konva node
    const {
      id, name: furn, x, y,
      rotateStart, rotation: rotateEnd, collision
    } = node.getAttrs();

    // Set the rotation based on the colliding status
    const transformEndAttrs = {
      id, furn, x, y,
      rot: (collision) ? rotateStart : rotateEnd
    };

    // Unset shadow
    // Reset node's appearance/attributes
    const furnItem = node.findOne('.furnItem');
    furnItem.shadowBlur(0);
    node.getLayer().batchDraw();

    if (collision) {
      return new Promise((resolve, reject) => {
        node.setAttr('collision', false);

        node.to({
          x: x,
          y: y,
          duration: 0.3,
          easing: Easings.StrongEaseIn,
          rotation: rotateStart,
          onFinish: () => resolve(transformEndAttrs)
        });
      });
    } else return new Promise((resolve, reject) => resolve(transformEndAttrs));
  }

  /** Sets cursor properties on Mouse over */
  static handleMouseOver(node, nodeSelected, mouseEvt) {
    const container              = node.getStage().container();
    const target                 = mouseEvt.target.getName();

    let cursor;
    if (target === 'closeButton') cursor = 'default';
    else  cursor = (nodeSelected) ? 'grab' : 'pointer';

    container.style.cursor = cursor;
  }
}