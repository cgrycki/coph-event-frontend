import { scaleLinear } from 'd3-scale';

// Our floorplan dimensions
const FP_BASE_WIDTH = 1920;
const FP_BASE_HEIGHT = 1500;


class ScaleUtils {

  /** Returns the dimensions of Div containing KonvaJS canvas. */
  static getContainerDimensions() {
    const stageContainer = document.querySelector('#Diagram--Container');
    const dimensions = {
      width: stageContainer.clientWidth,
      height: stageContainer.clientHeight
    };

    // Odd size can cause blur due to pixel rendering
    if (dimensions.width % 2 !== 0)  dimensions.width--;
    if (dimensions.height % 2 !== 0) dimensions.height--;

    return dimensions;
  }

  /** Returns a new dimensions object maximizing container space according to floorplan aspect ratio. */
  static computeAspectRatio(dimensions) {
    const ratio = Math.min(dimensions.width / FP_BASE_WIDTH, dimensions.height / FP_BASE_HEIGHT);
    return {
      width: FP_BASE_WIDTH * ratio,
      height: FP_BASE_HEIGHT * ratio
    };
  }

  static resizeStageToContainer(canvasRef) {
    const stage = canvasRef.getStage();
    let containerSize = this.getContainerDimensions();

    // Account for floorplan aspect ratio
    containerSize = this.computeAspectRatio(containerSize);

    stage.size(containerSize);
    stage.batchDraw();
    return containerSize;
  }

  static resizeItemCoordsToDimensions(items, oldDimensions, newDimensions) {
    const oldX = scaleLinear().domain([0, FP_BASE_WIDTH]).range([0, oldDimensions.width]);
    const newX = scaleLinear().domain([0, FP_BASE_WIDTH]).range([0, newDimensions.width]);
    const oldY = scaleLinear().domain([0, FP_BASE_HEIGHT]).range([0, oldDimensions.height]);
    const newY = scaleLinear().domain([0, FP_BASE_HEIGHT]).range([0, newDimensions.height]);

    const updatedItems = items.map(item => {
      let {x, y} = item;
      
      let floorplanX = oldX.invert(x);
      let scaledX    = newX(floorplanX);
      let floorplanY = oldY.invert(y);
      let scaledY    = newY(floorplanY);

      return {...item, x: scaledX, y: scaledY};
    });

    return updatedItems;
  }
}

const resizeItemCoordsToFloorplan = ScaleUtils.resizeItemCoordsToFloorplan;
export default ScaleUtils;
export { resizeItemCoordsToFloorplan };