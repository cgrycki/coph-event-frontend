import React from 'react';
import { Circle } from 'react-konva';

export default class CircleFurn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props};

  }

  //componentWillReceiveProps()

  render () {
    return (
      <Circle
        id={this.props.item_id}
        name={'circle'}
        x={this.props.x}
        y={this.props.y} 
        radius={20}
        fill={'#eeeeee'}
        stroke={'#000000'}
        strokeWidth={3}
        draggable={true}
        onDragEnd={this.props.updateFurnItem}
        onDblClick={this.props.removeFurnItem}
      />
    );
  }
}