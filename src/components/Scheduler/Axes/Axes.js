/**
 * React Component wrapping our two axes and markings
 */
import React                   from 'react';
import { utcFormat, utcParse } from 'd3-time-format';
import Axis                    from './Axis';


const formatTime = utcFormat("%I %p");
const formatMinorTick = (d, i) => (i % 2 !== 0) ? formatTime(d) : '';
const classMinorTick = (d, i) => (i % 2 !== 0) ? '' : 'minor';


export default ({ scales, margins, dimensions }) => {
  // Destructure our props
  const { xScale, yScale }           = scales;
  const { width,  height }           = dimensions;
  const { top, right, bottom, left } = margins;
  
  // Properties for each axis
  const xProps = {
    orient   : 'top',
    scale    : xScale,
    translate: `translate(0, ${top})`,
    tickSize : height - top - bottom,
    tickPadding: 3
  };

  const yProps = {
    orient     : 'Left',
    scale      : yScale,
    tranform   : `translate(0, 0)`,
    tickSize   : -(width - left - right),
    tickPadding: 3,
    ticks      : 20,
    format     : formatMinorTick,
    classed    : classMinorTick
  };


  // Render axis SVG group
  return (
    <g transform={`translate(${left}, ${top})`}>
      <Axis {...yProps} />
    </g>
  );
}