import React          from 'react';
import { Label }      from 'office-ui-fabric-react';
import { axisLeft }   from 'd3-axis';
import { utcParse }   from 'd3-time-format';
import { 
  scaleUtc, 
  scaleLinear 
}                     from 'd3-scale';

import options_time   from '../../../constants/time.constants';


const schedule_style = {
  width : '26%',
  margin: '0px 2% 15px',
  float : 'right'
};
const parseTime = utcParse("%I:%M %p"),
      day_start = parseTime("7:00 AM"),
      day_end   = parseTime("9:00 PM");


export default class RoomSchedule extends React.Component {
  constructor(props) {
    super();
    this.state = {
      width: 0,
      height: 0
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
    const x_scale = scaleLinear().range([0, this.state.width]);
    const y_scale = scaleUtc()
      .domain([day_start, day_end])
      .range([0, this.state.height]);
    
    return { x_scale, y_scale };
  }

  render() {
    return (
      <div style={schedule_style} ref={this.chartRef}>

        <Label>Room Schedule</Label>

        <svg
          ref={this.chartRef}
          className="ms-borderBase"
          width={this.state.width}
          height={this.state.height}
        >
        </svg>

      </div>
    );
  }
}