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

class FloorplanFunctions {
  constructor(canvasWidth) {
    // OG dimensions
    this.floorWidth = 2269;
    this.floorHeight = 1225;

    // Scaled dimensions
    this.canvasWidth = canvasWidth
    this.canvasHeight = this.resizeFloorplanHeight(canvasWidth);

    // Scales
    this.xScale = this.makeXScale(this.canvasWidth);
    this.yScale = this.makeYScale(this.canvasHeight);

    // Scaled Polygon
    this.resizedPoly = this.resizePolyPts(goodPoly);
  }

  resizeFloorplanHeight(width) {
    const newHeight = (this.floorHeight * width) / this.floorWidth;
    return newHeight;
  }

  makeXScale(width) {
    return scaleLinear().domain([0, this.floorWidth]).range([0, width]);
  }

  makeYScale(height) {
    return scaleLinear().domain([0, this.floorHeight]).range([0, height]);
  }

  resizePolyPts(pts) {
    const resizedPts = pts.map(d => {
      const resizeX = this.xScale(d[0]);
      const resizeY = this.yScale(d[1]);
      return [resizeX, resizeY];
    });
    return resizedPts;
  }

  ptInPolygon(pt) {
    return polygonContains(this.resizedPoly, pt);
  }
}

