/*
 * Floorplan Functions
 * Set of utilities that help in mapping the source floorplan's dimensions to
 * the screen size. Relies on D3 for most of the scaling and mathemagic.
 */

import { polygonContains }  from 'd3-polygon/src/contains';
import { scaleLinear }      from 'd3-scale/src/linear';


const FLOOR_WIDTH = 1920;
const FLOOR_HEIGHT = 1500;

// Hand traced polygon in Illustrator
export const goodPoly = [];


export default class FloorplanFunctions {
  static resizeToCanvas(width, height) {
    const imgAspectRatio = FLOOR_WIDTH / FLOOR_HEIGHT;
    const cnvAspectRatio = width / height;
    let renderableWidth, renderableHeight, xStart, yStart;

    // If image aspect ratio is less than canvas we fit on height
    // and place image image centered by width
    if (imgAspectRatio < cnvAspectRatio) {
      renderableHeight = height;
      renderableWidth = FLOOR_WIDTH * (renderableHeight / FLOOR_HEIGHT);
      xStart = (width / renderableWidth) / 2;
      yStart = 0;
    }

    // If image aspect ratio is greater than canvas' we fit on width
    // and place the image centered vertically
    else if (imgAspectRatio > cnvAspectRatio) {
      renderableWidth = width;
      renderableHeight = height * (renderableWidth / FLOOR_WIDTH);
      xStart = 0;
      yStart = (height - renderableHeight) / 2;
    }

    // Match: keep
    else {
      renderableHeight = height;
      renderableWidth = width;
      xStart = 0;
      yStart = 0;
    }

    return {
      width: renderableWidth,
      height: renderableHeight,
      x: xStart,
      y: yStart
    };
  }


  /**
   * Computes the scale factor needed to fit our high-res floorplan into
   * an (smaller) HTML5 canvas.
   * @param {number} width Current canvas width
   * @param {number} height Current canvas height
   * @returns {object} Scaling Dimensions to fit our image.
   */
  static resizeImageDimensionsToCanvas(width, height) {
    const scaleX = width / FLOOR_WIDTH;
    const scaleY = height / FLOOR_HEIGHT;
    return { scaleX, scaleY };
  }
}
