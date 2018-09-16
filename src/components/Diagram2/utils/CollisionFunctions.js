import sat from 'sat';
import { polygonContains } from 'd3-polygon';

export default class CollisionFunctions {
  static getNodeAttrs(node) {
    const { x, y } = node.position();

    const furnType = node.name();
    const furnGroupAttrs = node.getAttrs();
    const furnItem = node.findOne('.furnItem');
    const itemAttrs= node.getAttrs();
    console.log({ 
      furnType, 
      groupClientRect: node.getClientRect(), 
      furnGroupAttrs, 
      itemAttrs, 
      furnItem
    });
  }

  /** Translates a Konva node into a SAT shape with rotation, position, and dimensions. */
  static getRectangularFurnitureSAT(node) {
    const groupAttrs = node.getAttrs();
    const itemAttrs  = node.findOne('.furnItem').getAttrs();

    // FROM SATJS LIB
    // Create a box at (10,10) with width 20 and height 40.
    // var b = new SAT.Box(new SAT.Vector(10,10), 20, 40);
    const { x, y } = node.getPosition();

    // For reference, the whiteboard 'legs' are actually just lines, that are
    // centered around the x/y axis
    // +-9.5, +-1, +-10.5, +-1.75 => shorthand for our four line segments for 
    // a rectangle centered around (0, 0) **aka the user mouse click**. 
    const displayBoardWidth = 10.5 - -9.5;  // 19.5
    const displayBoardHeight = 1 - -1;       // 2

    // @todo
    // Our 'tables' are 15px  wide * 7px high (for now)
    const rectTableWidth = 15;
    const rectTableHeight= 7;

    // Assign SATjs dimensions based on what furniture it is
    const furnType = node.name();
    const satW     = (furnType === 'display') ? displayBoardWidth : rectTableWidth;
    const satH     = (furnType === 'display') ? displayBoardHeight : rectTableHeight;
    const satRect  = new sat.Box(new sat.Vector(x, y), satW, satH);

    // Create a polygon so we can apply the offset, rotation
    const satPoly = satRect.toPolygon();
    
    // @todo
    // Offsets are half of their furniture's dimensions to account for centering
    // the item on the user's mouse click
    const dispayOffsetX = displayBoardWidth / 2;
    const displayOffsetY = displayBoardHeight / 2;
    const rectTableOffsetX = rectTableWidth / 2;
    const rectTableOffsetY = rectTableHeight / 2;

    const satOffsetX = (furnType === 'display') ? dispayOffsetX : rectTableOffsetX;
    const satOffsetY = (furnType === 'display') ? displayOffsetY : rectTableOffsetY;
    const satOffset  = new sat.Vector(satOffsetX, satOffsetY);
    
    satPoly.setOffset(satOffset);
    satPoly.setAngle(node.getRotation());

    return satPoly;
  }

  static getCircleFurnitureSAT(node) {
    const { x, y } = node.getPosition();

    // Circular items are already centered for us by KonvaJS
    return null;
  }

  static getCircleTableSAT(node) {
    const { x, y } = node.getPosition();
    const radius   = 13.75;
    const buffer   = 0;

    const satCircle= new sat.Circle(new sat.Vector(x, y), radius + buffer);
    return satCircle;
  }

  static getFurnitureShape(konvaNode) {
    const furnType = konvaNode.getName();

    switch (furnType) {
      case 'circle': return this.getCircleTableSAT(konvaNode);
      case 'rect': return this.getRectangularFurnitureSAT(konvaNode);
      default: return null;
    }
  }

  static getFurnitureCollision(dragged, other) {
    const draggedShape     = this.getFurnitureShape(dragged);
    const otherShape       = this.getFurnitureShape(other);

    const collisionDetails = new sat.Response();
    const polygonCollision = sat.testCircleCircle(draggedShape, otherShape, collisionDetails);

    return polygonCollision;
  }
} 