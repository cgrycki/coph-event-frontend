import React, { Component } from 'react';
import { Layer, Rect } from 'react-konva';

export default class Background extends Component {
  render() {
    const { width, height } = this.props;
    return (
      <Layer>
        <Rect x={0} y={0} width={width} height={height} fill="#f4f4f4" opacity={0.5} listening={false} />
      </Layer>
    );
  }
}



