import { scaleLinear } from 'd3-scale';

// Our floorplan dimensions
const FP_BASE_WIDTH = 1920;
const FP_BASE_HEIGHT = 1500;


const scaleToFloorplan = (items, dimensions) => {
  const floorXScale = scaleLinear().domain([0, FP_BASE_WIDTH]).range([0, dimensions.width]);
  const floorYScale = scaleLinear().domain([0, FP_BASE_HEIGHT]).range([0, dimensions.height]);
  
  const trueSizedItems = items.map(item => {
    // Coords
    let trueX = floorXScale.invert(item.x);
    let trueY = floorYScale.invert(item.y);
    
    // Rotation
    let rot = item.rot;
    let trueRot = (rot >= 0) ? rot : 360 + rot;

    return {...item, x: trueX, y: trueY, rot: trueRot};
  });

  return trueSizedItems;
}

export default scaleToFloorplan;