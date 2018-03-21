/*
 * Point Utils
 * Set of utilities that help in mapping the source floorplan's dimensions to
 * the screen size. Relies on D3 for most of the scaling and mathemagic.
 */

//import { polygonContains } from 'd3-polygon';
//import { scaleLinear } from 'd3-scale';
var d3Polygon = require('d3-polygon'),
    polygonContains = d3Polygon.polygonContains;
var d3Scale = require('d3-scale'),
    scaleLinear = d3Scale.scaleLinear;

// Hand traced polygon in Illustrator
const goodPoly = [
  [1227, 265],
  [1699, 367],
  [1740, 705],
  [1917, 690],
  [1966, 450],
  [2049, 469],
  [2017, 330],
  [1951, 345],
  [1930, 252],
  [1987, 237],
  [1953, 67],
  [1089, 75],
  [949, 76],
  [957, 141],
  [990, 138],
  [999, 186],
  [918, 199],
  [927, 286],
  [1147, 271]
];

// Dimensions of our original floorplan image.
const floorWidth = 2269,
      floorHeight = 1225;

// Functions to create scales accoring to original floorplan size.      
const makeXScale = (width) => {
  return scaleLinear().domain([0, floorWidth]).range([0, width]);
}
const makeYScale = (height) => {
  return scaleLinear().domain([0, floorHeight]).range([0, height]);
}

// Real functions 
const resizeFloorplanHeight = (width) => {
  /* Resizes our floorplan, keeping the aspect ratio the same. */
  //  (floor height/floor width) = (canvas height/canvas width)
  // =(floor height * canvas width) / floor width
  const newheight = (floorHeight * width) / floorWidth;
  return newheight;
}

const resizePolyPts = (canvasWidth, canvasHeight) => {
  /* 
   * Funtion to map our traced good points and scale them down to 
   * our clients canvas size. This will enable accurate drag and drop boundairies.
   */
  const xScale = makeXScale(canvasWidth);
  const yScale = makeYScale(canvasWidth);

  const resizedPoly = goodPoly.map(d => {
    return [xScale(d[0]), yScale(d[1])];
  });

  return resizedPoly;
};



const testContains = (polygon) => {
  const resizedContainFx = (pt) => {
    return polygonContains(polygon, pt);
  };

  return resizedContainFx;
}





// Typical bootstrap breakpoint
const testWidth = 760;
const testHeight = resizeFloorplanHeight(760);

const resizedGoodPts = resizePolyPts(760, testHeight);
const testFx = testContains(resizedGoodPts);


console.log('new height: ', testHeight);
console.log(testFx([300, 300]));


