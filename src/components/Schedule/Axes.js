/**
 * React Component wrapping our two axes
 */

import React          from 'react';
import { 
  utcFormat,
  utcParse
}                     from 'd3-time-format';
import Axis           from './Axis';


const formatTime = utcFormat("%I%p");
const formatMinorTick = (d, i) => (i % 2 !== 0) ? formatTime(d) : '';

export default ({ scales, margins, dimensions }) => {
  // Destructure our props
  const { xScale, yScale } = scales;
  const { width,  height } = dimensions;
  
  // Properties for each axis
  const xProps = {
    orient   : 'Bottom',
    scale    : xScale,
    translate: `translate(0, ${margins.top})`,
    tickSize : height - margins.top - margins.bottom,
    tickPadding: 3
  };
  const yProps = {
    orient     : 'Left',
    scale      : yScale,
    tranform   : `translate(0, 0)`,
    tickSize   : -(width - margins.left - margins.right),
    tickPadding: 3,
    //format     : formatMinorTick,
    //ticks      : 20
  };

  const axes_g_transform = `translate(${margins.left}, 0)`;

  // Render axis SVG group
  return (
    <g transform={axes_g_transform}>
      <Axis {...yProps} />
    </g>
  );
}