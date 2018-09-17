import sat from 'sat';
import { polygonContains } from 'd3-polygon';

export default class CollisionFunctions {

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
    const displayBoardWidth = 20;  // 19.5
    const displayBoardHeight = 2;       // 2

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
    const dispayOffsetX    = -(displayBoardWidth / 2);
    const displayOffsetY   = -(displayBoardHeight / 2);
    const rectTableOffsetX = -(rectTableWidth / 2);
    const rectTableOffsetY = -(rectTableHeight / 2);

    const satOffsetX = (furnType === 'display') ? dispayOffsetX : rectTableOffsetX;
    const satOffsetY = (furnType === 'display') ? displayOffsetY : rectTableOffsetY;
    const satOffset  = new sat.Vector(satOffsetX, satOffsetY);
    
    satPoly.setOffset(satOffset);
    satPoly.setAngle(node.getRotation());

    return satPoly;
  }

  /** Translates a Konva Path node into a SAT polygon */
  static getCirclularFurnitureSAT(node) {
    const { x, y } = node.getPosition();

    // Konva radius = 4
    const cocktailRadius = 4;
    // Illustrator path dimensions => 15px * 15px
    const trashRadius = 7.5;

    // Rotation doesn't really matter
    // Circular items are already centered for us by KonvaJS, so offset doesn't
    const satRadius = (node.getName() === 'cocktail') ? cocktailRadius : trashRadius;
    const satCircle = new sat.Circle(new sat.Vector(x, y), satRadius);
    return satCircle;
  }

  /** Translates a Circle Table as a KonvaJS node into a SAT circle.  */
  static getCircleTableSAT(node) {
    const { x, y } = node.getPosition();
    const radius   = 13.75; // Diameter is 27.5, add a little extra
    const buffer   = 0.1;

    const satCircle= new sat.Circle(new sat.Vector(x, y), radius + buffer);
    return satCircle;
  }

  /** Translates a Konva chair Path node as SAT polygon. */
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

  /** Maps a Konva node to the appropriate SAT shape. */
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

  /** Reutrns the type of shape of a furniture type so that we may test collisions. */
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

  static getShapeCollision(shape1, type1, shape2, type2) {
    const collisionDetails = new sat.Response();
    let   collision;

    if ((type1 === 'circle') && (type2 === 'circle')) {
      collision = sat.testCircleCircle(shape1, shape2, collisionDetails);
    }
    else if ((type1 === 'circle') && (type2 === 'poly')) {
      collision = sat.testPolygonCircle(shape2, shape1, collisionDetails);
    }
    else if ((type1 === 'poly') && (type2 === 'circle')) {
      collision = sat.testPolygonCircle(shape1, shape2, collisionDetails);
    }
    else if ((type1 === 'poly') && (type2 === 'poly')) {
      collision = sat.testPolygonPolygon(shape1, shape2, collisionDetails);
    }
    else {
      console.log('conditional ran out of options, a konva node probably didnt get converted to a shape correctly');
      console.log('SAT shape types', type1, type2);
      collision = true;
    };

    return collision;
  }

  /** Returns a boolean if two KonvaJS nodes are colliding */
  static getFurnitureCollision(dragged, other) {
    // SATjs shapes
    const draggedShape     = this.getFurnitureShape(dragged);
    const otherShape       = this.getFurnitureShape(other);

    // The type of furniture dictates what type of shape, and consequently the
    // method used to compare the shapes for a collision.
    const draggedShapeType = this.getShapeType(dragged.getName());
    const otherShapeType   = this.getShapeType(other.getName());
    
    const collision = this.getShapeCollision(draggedShape, draggedShapeType, otherShape, otherShapeType);
    return collision;
  }

  static getClickShape(position, currentFurnType) {
    const width = {
      circle: 0,
      cocktail: 0,
      trash: 0,
      rect: 15,
      display: 20,
      chair: 8
    }
    const height = {
      circle: 0,
      cocktail: 0,
      trash: 0,
      rect: 7,
      display: 2,
      chair: 7
    }
    const radius = {
      circle: 13.75,
      cocktail: 4,
      trash: 15,
      rect: 0,
      display: 0,
      chair: 0
    }
    const offsetX = {
      circle: 0,
      cocktail: 0,
      trash: 0,
      rect: -7.5,
      display: -10,
      chair: -4

    }
    const offsetY = {
      circle: 0,
      cocktail: 0,
      trash: 0,
      rect: -3.5,
      display: -1,
      chair: -3.5
    }

    const currentFurnShapeType = this.getShapeType(currentFurnType);
    const { x, y }             = position;
    const satPosition          = new sat.Vector(x, y);
    const satRadius            = radius[currentFurnType];
    const satW                 = width[currentFurnType];
    const satH                 = height[currentFurnType];
    const satOffsetX           = offsetX[currentFurnType];
    const satOffsetY           = offsetY[currentFurnType];
    let satShape;

    if (currentFurnShapeType === 'circle') {
      satShape = new sat.Circle(satPosition, satRadius);
    }
    else {
      const satRect = new sat.Box(satPosition, satW, satH);
      satShape = satRect.toPolygon();
      satShape.setOffset(new sat.Vector(satOffsetX, satOffsetY));
    }

    return satShape;
  }


  /** Given a point, returns a boolean indicating if a furniture item can be
   * placed at an {x, y} position.
   */
  static getPositionCollision(position, stage, currentFurnType) {
    let collisionFlag = false;

    // Create a faux shape, representing the konva node if placed at the current
    // mouse click position
    const currentFurnShape = this.getClickShape(position, currentFurnType);
    const currentFurnShapeType = this.getShapeType(currentFurnType);

    // Grab each layer, and check all the children for collisions
    const itemLayer = stage.findOne('.itemLayer');
    const dragLayer = stage.findOne('.dragLayer');

    itemLayer.children.forEach(other => {
      let otherShapeType = this.getShapeType(other.getName());
      let otherShape     = this.getFurnitureShape(other);

      if (this.getShapeCollision(currentFurnShape, currentFurnShapeType, otherShape, otherShapeType))
        collisionFlag = true;
    });

    dragLayer.children.each(other => {
      // Skip the transformer node on the selected/drag layer
      if (other.getName() !== undefined) {
        let otherShapeType = this.getShapeType(other.getName());
        let otherShape     = this.getFurnitureShape(other);
        
        if (this.getShapeCollision(currentFurnShape, currentFurnShapeType, otherShape, otherShapeType))
          collisionFlag = true;
      }
    });

    return collisionFlag;
  }
} 