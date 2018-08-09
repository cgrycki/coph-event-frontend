import React          from 'react';
import { Label }      from 'office-ui-fabric-react';
import { 
  scaleUtc, 
  scaleLinear 
}                     from 'd3-scale';
import {
  day_start,
  day_end
}                     from './shared';

import Bars           from './Bars';
import Axes           from './Axes';


const schedule_style = {
  width : '26%',
  margin: '0px 2% 15px',
  float : 'right'
};


export default class RoomSchedule extends React.Component {
  constructor(props) {
    super();
    this.state = {
      width: 0,
      height: 0,
      margins: { top: 10, right: 0, bottom: 10, left: 35 }
    };

    this.chartRef = React.createRef();
    this.handleResize = this.handleResize.bind(this);
    this.createScale  = this.createScale.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    let el = this.chartRef.current;
    let width = el.offsetWidth;
    let height = el.offsetHeight;
    this.setState({ width, height });
  }

  createScale() {
    /* Create scales, takes width and height from our store. */
    // Get margins from our state
    const { 
      width, height, 
      margins: { top, right, bottom, left }
    } = this.state;


    const xScale = scaleLinear()
      .range([left, width - right]);
    const yScale = scaleUtc()
      .domain([day_start, day_end])
      .range([top, height - bottom]);
    
    return { xScale, yScale };
  }

  render() {

    // Create scales to pass to our axes
    const { xScale, yScale } = this.createScale();
    const { width, height, margins } = this.state;
    const { 
      room_schedule, 
      start_time, end_time, event_name,
      schedule_overlap
    } = this.props;


    return (
      <div style={schedule_style} ref={this.chartRef}>

        <Label>Room Schedule</Label>

        <svg
          ref={this.chartRef}
          className="ms-borderBase Schedule"
          width={width}
          height={height}
        >
          <Axes
            scales={{ xScale, yScale }}
            margins={margins}
            dimensions={{ width, height }}
          />
          <Bars
            scales={{ xScale, yScale }}
            margins={margins}
            dimensions={{ width, height }}
            room_schedule={room_schedule}
            start_time={start_time}
            end_time={end_time}
            event_name={event_name}
            schedule_overlap={schedule_overlap}
          />
        </svg>

      </div>
    );
  }
}