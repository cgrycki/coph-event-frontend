/**
 * Editor Functions
 * @module
 */
import CollisionFunctions from './CollisionFunctions';


class EditorFunctions {
  /**
   * Returns the scaled (true) mouse position in case diagram is scaled, etc.
   * @param {object} canvas Konva Canvas, from React reference' `getStage()`.
   * @param {object} position Object denoting mouse position on canvas.
   * @returns {object} Canvas' scaled mouse position.
   */
  static scalePosition(canvas, position) {
    const x = (position.x - canvas.attrs.x) / canvas.attrs.scaleX;
    const y = (position.y - canvas.attrs.y) / canvas.attrs.scaleY;
    return { x, y };
  }

  /**
   * Computes new scale and mouse position after user zooms in or out.
   * @param {node} canvasRef React reference to Konva canvas node.
   * @param {event} zoomEvt A 'mousewheel' triggered event.
   * @returns {object} { scaleXY: [], xy: [] }
   */
  static handleZoomEvent(canvasRef, zoomEvt) {
    // Prevent the default event from bubbling.
    zoomEvt.evt.preventDefault();

    // Gather variables to compute new scale and position.
    const canvas      = canvasRef.getStage();
    const canvasAttrs = canvas.getAttrs();
    const pointerPos  = canvas.getPointerPosition();
    const oldScale    = canvas.getScaleX();

    // Pointer position is the mouse coords of the mouse on canvas
    // so it can be 900, 450 regardless of zoom level

    // Compute new mouse position.
    const mousePoint = {
      x: pointerPos.x / oldScale - canvasAttrs.x / oldScale,
      y: pointerPos.y / oldScale - canvasAttrs.y / oldScale
    };

    // Compute the new scale, adjusting for under and over-zooming.
    let newScale = (zoomEvt.evt.deltaY < 0) ? oldScale * 1.0375 : oldScale / 1.0375;
    newScale = Math.max(Math.min(newScale, 8), 1);

    // Update new XY position
    const newPosition = {
      x: -(mousePoint.x - pointerPos.x / newScale) * newScale,
      y: -(mousePoint.y - pointerPos.y / newScale) * newScale
    };

    return { ...newPosition, scaleX: newScale, scaleY: newScale };
  }

  /** Handles canvas clicks, called for *every* click. */
  static handleClickEvent(canvasRef, clickEvt, currentFurnType) {
    const nullAction = { action: 'selectItem', payload: null };

    // Some interaction housekeeping: prevent bubble + ignore right click
    clickEvt.evt.preventDefault();
    clickEvt.cancelBubble = true;
    if (clickEvt.evt.button === 2) return nullAction;

    
    // Gather variables and scale (possibly zoomed) mouse position
    const canvas        = canvasRef.getStage();
    const rawPointerPos = canvas.getPointerPosition();
    const pointerPos    = this.scalePosition(canvas, rawPointerPos);


    // Check if mouse position is intersecting => returns node if true
    const intersects = canvas.getIntersection(rawPointerPos);
    // console.log(intersects);
    if (intersects === null) return nullAction;

    // Get intersection node and return the appropriate action
    const intersectName = intersects.getAttr('name');
    if (intersectName === 'FLOOR_GOOD') {
      if (!CollisionFunctions.getPositionCollision(pointerPos, canvas, currentFurnType)) {
        return { action: 'addItem', payload: pointerPos };
      } else {
        return nullAction;
      }
    } else if (intersectName === 'furnItem') {
      const furnWrapper = intersects.getParent();
      const furnItem = furnWrapper.getParent().id();
      return { action: 'selectItem', payload: furnItem };
    }
    else if (intersectName === 'closeButton') {
      const id = intersects.getParent().id();
      return { action: 'removeItem', payload: id };
    } 
    else { 
      return nullAction;
    };
  }

  /** Handles key presses, called for *every* keypress */
  static handleKeyPressEvent(canvasRef, keyEvt) {
    console.log(keyEvt, keyEvt.keyCode);

    const DELTA        = 5;
    const keyCode      = keyEvt.keyCode;
    const shiftPressed = keyEvt.shiftKey;

    let action; // move, rotate, or unselect
    let payload;

    // Key codes
    if (keyCode === 37) {
      action = 'move';
      payload = { x: -DELTA };
    }
    else if (keyCode === 38) {
      action = 'move';
      payload = { y: -DELTA };
    }
    else if (keyCode === 39) {
      action = 'move';
      payload: { x: DELTA };
    }
    // 38, ArrowUp
    // 37, ArrowLeft
    // 39. ArrowRight
    //40, ArrowDown
    // 27, escape
  }

  /** Stores container cursor before drag, and sets cursor style to grabbing. */
  static handleDragStart(canvasRef, dragEvt) {
    const stage = canvasRef.getStage();
    const container = stage.container();

    const cursorBeforeDrag = container.style.cursor;
    stage.setAttr('cursor', cursorBeforeDrag);

    container.style.cursor = 'grabbing';
  }

  static handleDragEnd(canvasRef, dragEvt) {
    if (dragEvt === null) return null;

    const stage = canvasRef.getStage();
    const container = stage.container();
    const cursorBeforeDrag = stage.getAttr('cursor');
    container.style.cursor = cursorBeforeDrag;


    const { nodeType } = dragEvt.target;
    if (nodeType === 'Stage') {
      return {
        x: dragEvt.target.getAttr('x'),
        y: dragEvt.target.getAttr('y')
      };
    } else return null;
  }
}


export default EditorFunctions;
