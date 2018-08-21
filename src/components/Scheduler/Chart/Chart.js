// Dependencies
import React                    from 'react';
import { scaleBand, scaleUtc }  from 'd3-scale';
import { day_start, day_end }   from '../shared';

import Wrapper                  from './Wrapper';
import Axes                     from '../Axes';
import Bars                     from '../Bars';


class Chart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      margins: {
        top   : 10,
        right : 10,
        bottom: 10,
        left  : 40
      }
    };
  }

  createScales() {
    /* Creates scales based on passed width + height */
    let { width, height } = this.props;
    let { margins: { top, right, bottom, left }} = this.state;

    let xScale = null;
    let yScale = scaleUtc()
      .domain([day_start, day_end])
      .range([top, height-top-bottom]);

    return { xScale, yScale };
  }

  render() {
    /* Renders a chart. */

    // Passed from HOC Wrapper
    const { width, height } = this.props;

    // Used in our charting components
    const { margins } = this.state;
    const dimensions  = { width, height };
    const scales      = this.createScales();

    // Data!
    let { room_schedule, new_event } = this.props;

    return (
      <svg width={dimensions.width} height={dimensions.height}>

        <Axes
          dimensions={dimensions}
          scales={scales}
          margins={margins}
        />

        <Bars
          dimensions={dimensions}
          scales={scales}
          margins={margins}
          room_schedule={room_schedule}
          new_event={new_event}
        />

      </svg>
    );
  }
}

export default Wrapper(Chart);