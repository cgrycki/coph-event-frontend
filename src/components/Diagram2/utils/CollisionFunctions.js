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
    const dispayOffsetX    = displayBoardWidth / 2;
    const displayOffsetY   = displayBoardHeight / 2;
    const rectTableOffsetX = rectTableWidth / 2;
    const rectTableOffsetY = rectTableHeight / 2;

    const satOffsetX = (furnType === 'display') ? dispayOffsetX : rectTableOffsetX;
    const satOffsetY = (furnType === 'display') ? displayOffsetY : rectTableOffsetY;
    const satOffset  = new sat.Vector(satOffsetX, satOffsetY);
    
    satPoly.setOffset(satOffset);
    satPoly.setAngle(node.getRotation());

    return satPoly;
  }

  static getCirclularFurnitureSAT(node) {
    const { x, y } = node.getPosition();

    // Konva radius = 4
    const cocktailRadius = 8;
    // Illustrator path dimensions => 15px * 15px
    const trashRadius = 7.5;

    // Rotation doesn't really matter
    // Circular items are already centered for us by KonvaJS, so offset doesn't
    const satRadius = (node.getName() === 'cocktail') ? cocktailRadius : trashRadius;
    const satCircle = new sat.Circle(new sat.Vector(x, y), satRadius);
    return satCircle;
  }

  static getCircleTableSAT(node) {
    const { x, y } = node.getPosition();
    const radius   = 14;
    const buffer   = 0;

    const satCircle= new sat.Circle(new sat.Vector(x, y), radius + buffer);
    return satCircle;
  }

  static getChairSAT(node) {
    const { x, y } = node.getPosition();

    // From Adobe Illustrator: chair path is 8px * 6.96px
    const chairWidth  = 8;
    const chairHeight = 7;
    const satRect     = new sat.Box(new sat.Vector(x, y), chairWidth, chairHeight);

    // Polygonal transformations
    const rotation  = node.getRotation();
    const offsetX   = -(chairWidth / 2);
    const offsetY   = -(chairHeight / 2);
    const satOffset = new sat.Vector(offsetX, offsetY);

    // SATjs
    const satPoly = satRect.toPolygon();
    satPoly.setOffset(satOffset);
    satPoly.setAngle(rotation);

    return satPoly;
  }

  static getFurnitureShape(konvaNode) {
    const furnType = konvaNode.getName();

    switch (furnType) {
      case 'circle'  : return this.getCircleTableSAT(konvaNode);
      case 'cocktail': return this.getCirclularFurnitureSAT(konvaNode);
      case 'trash'   : return this.getCirclularFurnitureSAT(konvaNode);
      case 'rect'    : return this.getRectangularFurnitureSAT(konvaNode);
      case 'display' : return this.getRectangularFurnitureSAT(konvaNode);
      case 'chair'   : return this.getChairSAT(konvaNode);
           default   : return null;
    }
  }

  static getShapeType(furnType) {
    const furnToShape = {
      circle  : 'circle',
      cocktail: 'circle',
      trash   : 'circle',

      rect   : 'poly',
      display: 'poly',
      chair  : 'poly'
    };

    return furnToShape[furnType];
  }

  static getFurnitureCollision(dragged, other) {
    // SATjs shapes
    const draggedShape     = this.getFurnitureShape(dragged);
    const otherShape       = this.getFurnitureShape(other);

    // The type of furniture dictates what type of shape, and consequently the
    // method used to compare the shapes for a collision.
    const draggedShapeType = this.getShapeType(dragged.getName());
    const otherShapeType   = this.getShapeType(other.getName());
    

    const collisionDetails = new sat.Response();
    let   collision;

    if ((draggedShapeType === 'circle') && (otherShapeType === 'circle')) {
      collision = sat.testCircleCircle(draggedShape, otherShape, collisionDetails);
    }
    else if ((draggedShapeType === 'circle') && (otherShapeType === 'poly')) {
      collision = sat.testPolygonCircle(otherShape, draggedShape, collisionDetails);
    }
    else if ((draggedShapeType === 'poly') && (otherShapeType === 'circle')) {
      collision = sat.testPolygonCircle(draggedShape, otherShape, collisionDetails);
    }
    else if ((draggedShapeType === 'poly') && (otherShapeType === 'poly')) {
      collision = sat.testPolygonPolygon(draggedShape, otherShape, collisionDetails);
    }
    else {
      console.log('conditional ran out of options, a konva node probably didnt get converted to a shape correctly');
      console.log('Konva nodes', dragged, other);
      console.log('SAT shape types', draggedShapeType, otherShapeType);
      collision = true;
    };

    if (collision) console.log(collisionDetails);
    return collision;
  }
} 