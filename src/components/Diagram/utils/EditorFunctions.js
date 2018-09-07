/**
 * Editor Functions
 * @module
 */
import { polygonContains }  from 'd3-polygon/src/contains';
import { scaleLinear }      from 'd3-scale/src/linear';

const floorplanWidth = 3840;
const floorplanHeight= 3000;


class EditorFunctions {
  /**
   * Resizes Konva canvas to container size while preserving aspect ratio.
   * @param {Object} canvasRef Konva canvas reference.
   * @returns {Object} Dimensions of container
   */
  static handleComponentMount(canvasRef) {
    // Get a pointer to Konva canvas
    const canvas = this.refs.konvaCanvas.getStage();

    // Get a pointer to it's container
    const container = canvas.getAttr('container');

    // Get container's width attr
    const containerWidth = container.clientWidth;
    
    // Compute new height
    const newHeight = (floorplanHeight * containerWidth) / floorplanWidth;
    
    return { wh: [containerWidth, newHeight] };
  }

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
    let newScale = (zoomEvt.evt.deltaY < 0) ? oldScale * 1.05 : oldScale / 1.05;
    newScale = Math.max(Math.min(newScale, 8), 1);

    // Update new XY position 
    const newPosition = [
      -(mousePoint.x - pointerPos.x / newScale) * newScale,
      -(mousePoint.y - pointerPos.y / newScale) * newScale
    ];

    return { xy: newPosition, scaleXY: [newScale, newScale] };
  }

  /** Handles left clicks diagram wide. */
  static handleClickEvent(canvasRef, clickEvt) {
    // Some interaction housekeeping: prevent bubble + ignore right click
    clickEvt.evt.preventDefault();
    clickEvt.cancelBubble = true;
    if (clickEvt.evt.button === 2) return null;
    
    // Gather variables and scale (possibly zoomed) mouse position
    const canvas        = canvasRef.getStage();
    const rawPointerPos = canvas.getPointerPosition();
    const pointerPos    = this.scalePosition(canvas, rawPointerPos);


    // Check if mouse position is intersecting => returns node if true
    const intersects = canvas.getIntersection(pointerPos);
    if (intersects === null) return null;

    // We hit something
    const intersectName = intersects.getAttr('name');
    return (intersectName === 'Floorplan') ? pointerPos : null;
  }
}


export default EditorFunctions;
