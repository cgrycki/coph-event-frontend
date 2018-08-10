import React from 'react';
import {
  parseAppTime,
  parseMauiTime
} from './shared';



export default class Bars extends React.PureComponent {
  renderTitle(title) {
    /* Renders an SVG text element denoting an events title */

    // Create a shortened title to display
    const titleLength = 25;
    const abbvTitle = (title.length > titleLength) ? 
      title.slice(0, titleLength-3) + '...':
      title.padEnd(titleLength - title.length, ' ');

    return (
      <text
        x={2}
        dx={3}
        dy={5}
        fontSize={11}
        fontFamily={'monospace'}
        alignmentBaseline={'hanging'}
      >{abbvTitle}</text>
    );
  }

  renderRoomBar(data, props) {
    /* Renders an event from MAUI's Astra Room Schedule. */

    // Standard scales/margins/dimensions
    let { scales, margins, dimensions } = props;
    let { yScale } = scales;
    let { width } = dimensions;

    // MAUI event attributes
    let { title, startTime, endTime, counter } = data;
    startTime = parseMauiTime(startTime);
    endTime   = parseMauiTime(endTime);

    return (
      <g 
        key={counter}
        transform={`translate(${margins.left}, ${yScale(startTime)})`}
      >
        <rect
          x={2}
          y={0}
          width={width - margins.left - margins.right - 4}
          height={yScale(endTime) - yScale(startTime)}
          fill={"#0078d4"}
          fillOpacity={0.75}
          title={title}
        />
        {this.renderTitle(title)}
      </g>
    );
  }

  renderEventBar(data, props) {
    /* CONDITIONALLY renders our proposed event time. */

    // Standard scales/margins/dimensions
    let { scales, margins, dimensions, schedule_overlap } = props;
    let { yScale } = scales;
    let { width } = dimensions;

    // Event attributes, make sure we have valid attributes
    let { event_name, start_time, end_time } = data;
    if (start_time === "" || end_time === "") return (<g></g>);

    // Parse times
    start_time = parseAppTime(start_time);
    end_time   = parseAppTime(end_time);


    return (
      <g 
        key={'proposed_event'}
        transform={`translate(${margins.left}, ${yScale(start_time)})`}
      >
        <rect
          x={2}
          y={0}
          width={width - margins.left - margins.right - 4}
          height={yScale(end_time) - yScale(start_time)}
          fill={(schedule_overlap) ? "#e81123" : "#107c10"}
          fillOpacity={0.5}
          title={event_name}
        />
        {this.renderTitle(event_name)}
      </g>
    );
  }

  render() {
    let { room_schedule, start_time, end_time, event_name } = this.props;

    // Create the room's events
    let room_bars = room_schedule.map(d => this.renderRoomBar(d, this.props));
    
    // Create proposed event
    let event_bar = this.renderEventBar({ start_time, end_time, event_name}, this.props);

    return (
      <g>
        {room_bars}
        {event_bar}
      </g>
    );
  }
}