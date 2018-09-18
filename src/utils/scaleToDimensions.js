import { scaleLinear } from 'd3-scale';

// Our floorplan dimensions
const FP_BASE_WIDTH = 1920;
const FP_BASE_HEIGHT = 1500;


const scaleToDimensions = (items, dimensions) => {
  const floorXScale = scaleLinear().domain([0, FP_BASE_WIDTH]).range([0, dimensions.width]);
  const floorYScale = scaleLinear().domain([0, FP_BASE_HEIGHT]).range([0, dimensions.height]);
  
  const scaledItems = items.map(item => {
    let trueX = floorXScale(item.x);
    let trueY = floorYScale(item.y);

    return {...item, x: trueX, y: trueY};
  });

  return scaledItems;
}

export default scaleToDimensions;