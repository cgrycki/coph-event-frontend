import React from 'react';
import { Stage, Layer, Circle } from 'react-konva';

export default class GUI extends React.Component {

  render() {
    const circles = this.props.circle.map((d, i) => {
      return (<Circle
        key={'circle' + i}
        id={d.item_id}
        name={'circle'}
        x={d.x}
        y={d.y} 
        radius={20}
        stroke={'#000000'}
        strokeWidth={3}
        draggable={true}
        onDragEnd={this.props.updateFurnItem}
        onClick={this.props.removeFurnItem}
      />);
    });
    
    return (
      <Stage
        ref={"konvaCanvas"}
        width={500}
        height={500}
        onContentClick={this.props.addFurnItem}
      >
        <Layer></Layer>
        <Layer>{circles}</Layer>
      </Stage>
    );
  }
}