import React from 'react';
import { Stage, Layer } from 'react-konva';

export default class GUI extends React.Component {
  
  render() {
    return (
      <Stage
        width={500}
        height={500}
      >
        <Layer></Layer>
        <Layer></Layer>
      </Stage>
    );
  }
}