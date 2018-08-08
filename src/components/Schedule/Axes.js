/**
 * React Component wrapping our two axes
 */

import React from 'react';
import Axis from './Axis';

export default ({ scales, margins, dimensions }) => {
  // Destructure our props
  const { xScale, yScale } = scales;
  const { width,  height } = dimensions;
  
  // Properties for each axis
  const xProps = {
    orient   : 'Top',
    scale    : xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize : height - margins.top - margins.bottom
  };
  const yProps = {
    orient   : 'Left',
    scale    : yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize : width - margins.left - margins.right
  };

  // Render axis SVG group
  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  );
}