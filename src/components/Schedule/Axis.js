/**
 * Axis Component
 */

import React from 'react';
import * as d3Axis from 'd3-axis';
import { select } from 'd3-selection';
import './Schedule.css';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    /* Creates a new d3 axis based on props passed to component. */
    const { orient, scale, tickSize, tickPadding, format, ticks } = this.props;

    // Construct d3 axis
    const axis_type = `axis${orient}`;
    let axis = d3Axis[axis_type]()
      .scale(scale)
      .tickSize(tickSize)
      .tickPadding(tickPadding);
    
    // add ticks
    if (ticks !== undefined) axis.ticks(ticks);
    
    // Conditionally add tick formatting
    if (format !== undefined) axis.tickFormat(format);

    // Select this component's ref and update with new axis object.
    select(this.axisElement).call(axis);
  }

  render() {
    /* Renders a SVG axis group element. */
    const { orient, transform } = this.props;

    return (
      <g
        className={`Axis Axis--${orient}`}
        ref={(el) => { this.axisElement = el; }}
        transform={transform}
      />
    );
  }
}