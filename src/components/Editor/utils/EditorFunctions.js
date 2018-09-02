/**
 * Editor Functions
 * @module
 */

class EditorFunctions {
  /**
   * Computes new scale and mouse position after user zooms in or out.
   * @param {node} canvasRef React reference to Konva canvas node.
   * @param {event} zoomEvt A 'mousewheel' triggered event.
   * @returns {object} { scaleX, scaleY, x, y }
   */
  static handleZoomEvent(canvasRef, zoomEvt) {
    // Prevent the default event from bubbling.
    zoomEvt.evt.preventDefault();

    // Gather variables to compute new scale and position.
    const canvas      = canvasRef.getStage();
    const canvasAttrs = canvas.attrs;
    const pointerPos  = canvas.getPointerPosition();
    const xScaleOld   = canvas.getScaleX();

    //console.log(canvas, canvasAttrs, pointerPos, xScaleOld, yScaleOld);

    // Compute new mouse position.
    const mousePoint = {
      x: (pointerPos.x - canvasAttrs.x) / canvas.getScaleX(),
      y: (pointerPos.y - canvasAttrs.y) / canvas.getScaleY()
    };

    // Compute the new scale, adjusting for overzooming (out).
    let newScale = (zoomEvt.evt.deltaY < 0) ? xScaleOld * 1.1 : xScaleOld / 1.1;
    newScale = (newScale < 1) ? 1 : newScale;

    // Compute new (x, y) center for translated zoom.
    const { x: newX, y: newY } = this.getScaledCoords(canvas);
    const newPosition = [
      -(mousePoint.x - newX / newScale) * newScale,
      -(mousePoint.y - newY / newScale) * newScale
    ];

    return {
      xy     : newPosition,
      scaleXY: [newScale, newScale]
    };
  }


  /**
   * Returns an {x, y} object denoting the new center position.
   * @param {object} canvasAttrs Konva Canvas attributes, returned from Konva canvas or ref.
   * @returns {object} Object holding new pointer `x, y` coordinates rescaled.
   */
  static getScaledCoords(canvas) {
    const canvasAttrs = canvas.attrs;
    const pointerPos = canvas.getPointerPosition();

    const x = (pointerPos.x - canvasAttrs.x) / canvas.getScaleX();
    const y = (pointerPos.y - canvasAttrs.y) / canvas.getScaleY();

    return { x, y };
  }
}


export default EditorFunctions;
