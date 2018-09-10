import React from 'react';
import { Layer, Circle } from 'react-konva';

export default class GridLayer extends React.PureComponent {
  gridDot = (x, y) => {
    return (
      <Circle
        key={`gridDot-${x}-${y}`}
        listening={false}
        x={x}
        y={y}
        radius={1}
        fill='#dddddd'
      />
    );
  }

  gridDots = (width, height) => {
    const dots = [];

    for (var x=0; x < width; x+=10) {
      for (var y=0; y < height; y+=10) {
        dots.push(this.gridDot(x, y));
      }
    }

    return dots;
  }

  render() {
    const { width, height } = this.props;

    return (<Layer listening={false}>{this.gridDots(width, height)}</Layer>);
  }
}