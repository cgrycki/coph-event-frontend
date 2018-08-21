import React from 'react';

export default class Bar extends React.PureComponent {
  renderTitle(title) {
    /* Renders an SVG text element denoting an events title */

    if (!title) return;

    // Create a shortened title to display
    const titleLength = 25;
    const abbvTitle = (title.length > titleLength) ? 
      title.slice(0, titleLength-3) + '...':
      title.padEnd(titleLength - title.length, ' ');

    return (
      <text
        x={2}
        dx={1}
        dy={1}
        fontSize={11}
        fontFamily={'monospace'}
        alignmentBaseline={'hanging'}
      >{abbvTitle}</text>
    );
  }

  render() {
    /* Renders an SVG group representing a event. */
    let {
      itemKey, transform,
      x, y, width, height, 
      fill, fillOpacity, 
      title 
    } = this.props;

    return (
      <g
        key={itemKey}
        transform={transform}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          fillOpacity={fillOpacity}
          className="EventBar"
        />
        {(title !== "") && this.renderTitle(title)}
      </g>
    );
  }
}