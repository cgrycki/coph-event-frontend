import React, { Component } from 'react';
import { Layer, Rect }      from 'react-konva';
import Floorplan from './Floorplan';
import FloorplanFunctions   from './FloorplanFunctions';


export default class Viewport extends Component {
  
  getViewportPosition = () => {
    const { width, height } = this.props;

    // Scale down
    const viewportWidth = width / 6;
    const viewportHeight = height / 6;

    const offset = 20;

    const x = width - viewportWidth - offset;
    const y = offset;

    return {
      width: viewportWidth,
      height: viewportHeight,
      x,
      y
    };
  }

  getViewport = () => {

  }
  
  render() {
    const { width, height, x, y } = this.getViewportPosition();
    const { scaleX, scaleY } = FloorplanFunctions.resizeImageDimensionsToCanvas(width, height);

    const offsetX = Math.abs(this.props.x) * scaleX;
    const offsetY = Math.abs(this.props.y) * scaleY;


    return (
      <Layer name="ViewportLayer">
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="#ffffff"
          stroke="#666666"
          strokeWidth={1}
        />
        <Rect
          x={x + offsetX}
          y={y + offsetY}
          width={width * scaleX}
          height={height * scaleY}
          stroke={'red'}
          strokeWidth={1}
        />
      </Layer>
    );
  }
}