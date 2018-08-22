import React                            from 'react';
import { parseAppTime, parseMauiTime }  from '../shared';
import Bar                              from './Bar';



export default class Bars extends React.PureComponent {
  renderMAUIBar(data, props) {
    /* Renders an event from MAUI's Astra Room Schedule. */

    // Standard scales/margins/dimensions
    let { scales, margins, dimensions } = props;
    let { yScale }                      = scales;
    let { width }                       = dimensions;

    // MAUI event attributes
    let { title, startTime, endTime, counter } = data;
    startTime = parseMauiTime(startTime);
    endTime   = parseMauiTime(endTime);

    return (
      <Bar
        key={counter}
        transform={`translate(${margins.left}, ${yScale(startTime)})`}
        x={1}
        y={0}
        width={width - margins.left - margins.right - 2}
        height={yScale(endTime) - yScale(startTime)}
        fill={"#0078d4"}
        fillOpacity={0.75}
        title={title}
      />
    );
  }

  renderUserBar(data, props) {
    /* CONDITIONALLY renders our proposed event time. */

    // Standard scales/margins/dimensions
    let { scales, margins, dimensions, schedule_overlap } = props;
    let { yScale } = scales;
    let { width } = dimensions;

    // Event attributes, make sure we have valid attributes
    let { title, start, end } = data;
    if (start === "" || end === "") return (<g></g>);

    // Parse times
    start = parseAppTime(start);
    end   = parseAppTime(end);

    // One more check for negative heights
    if ((yScale(end) - yScale(start)) < 0) return (<g></g>);
      
    return (
      <Bar
        key={'proposedEvent'}
        transform={`translate(${margins.left}, ${yScale(start)})`}
        x={1}
        y={0}
        width={width - margins.left - margins.right - 2}
        height={yScale(end) - yScale(start)}
        fill={(schedule_overlap) ? "#e81123" : "#107c10"}
        fillOpacity={0.5}
        title={title}
        className="EventBar"
      />
    );
  }

  render() {
    const { room_schedule, new_event } = this.props;

    // Create the room's events
    const room_bars = room_schedule.map(d => this.renderMAUIBar(d, this.props));
    // Create proposed event
    const proposedEvent = this.renderUserBar(new_event, this.props);

    return (
      <g>
        {room_schedule.length > 0 && room_bars}
        {proposedEvent}
      </g>
    );
  }
}