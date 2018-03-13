import React from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import { editorClickEvent } from '../../utils';

export default class GUI extends React.Component {
  
  render() {
    const circles = this.props.circle.map((d, i) => {
      return (<Circle
        key={'circle' + i}
        name={'circle'}
        x={d.x}
        y={d.y} 
        radius={20}
        stroke={'#000000'}
        strokeWidth={3}
        draggable={true}
      />);
    });
    
    return (
      <Stage
        width={500}
        height={500}
      >
        <Layer></Layer>
        <Layer>{circles}</Layer>
      </Stage>
    );
  }
}