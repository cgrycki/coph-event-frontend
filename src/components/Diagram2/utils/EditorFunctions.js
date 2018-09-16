/**
 * Editor Functions
 * @module
 */
import { polygonContains }  from 'd3-polygon/src/contains';
import { scaleLinear }      from 'd3-scale/src/linear';


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
  static handleClickEvent(canvasRef, clickEvt) {
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
      return { action: 'addItem', payload: pointerPos };
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


  static handleDragEnd(dragEvt) {
    if (dragEvt === null) return null;

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
