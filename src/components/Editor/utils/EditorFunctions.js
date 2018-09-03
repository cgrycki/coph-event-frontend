/**
 * Editor Functions
 * @module
 */
import { polygonContains }  from 'd3-polygon/src/contains';
import { scaleLinear }      from 'd3-scale/src/linear';

const floorplanWidth = 2269;
const floorplanHeight= 1225;


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

  static handleZoomMatrix(canvasRef, zoomEvt, matrix) {
    zoomEvt.evt.preventDefault();



    const canvas = canvasRef.getStage();
    const canvasAttrs = canvas.getAttrs();
    const zoomScale = (zoomEvt.evt.deltaY < 0) ? 1.05 : 0.95;

    for (var i=0; i < matrix.length; i++) matrix[i] *= zoomScale;

    matrix[4] += (1 - zoomScale) * canvasAttrs.width / 2;
    matrix[5] += (1 - zoomScale) * canvasAttrs.height / 2;

    return { matrix };
  }
}


export default EditorFunctions;
