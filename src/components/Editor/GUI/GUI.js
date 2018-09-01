// Dependencies
import React      from 'react';
import { Stage }  from 'react-konva';

// Components
import Floorplan  from './Floorplan';


// React (Konva) Component
export default class GUI extends React.Component {
  state = {
    width : 900,
    height: 500,
    scaleX: 1,
    scaleY: 1,
    x     : 0,
    y     : 0
  };

  render() {
    let { width, height, scaleX, scaleY, x, y } = this.state;

    return (
      <Stage 
        ref="konvaCanvas"
        width={width}
        height={height}>
        <Floorplan width={width} height={height} />
      </Stage>
    );
  }
}