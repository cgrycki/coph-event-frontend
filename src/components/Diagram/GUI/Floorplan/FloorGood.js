import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';


const PATH = 'M1770.9,736.66,1699.33,750,1723,855.9l-169,18.4-1-14.3-135-30.9-4-14.1-18.5-17h-25.2L1348,814l-215.62-49.84L1041,777.55,748.9,810l-9.4-84,159.4-18.5L894.75,628h853.3Z';
const FLOOR_WIDTH = 1920;
const FLOOR_HEIGHT= 1500;


export default class FloorGood extends React.Component {
  onDragLeave = event => {
    console.log(event);
  }

  render() {
    const { width, height } = this.props;
    const { scaleX, scaleY } = FloorplanFunctions.resizeImageDimensionsToCanvas(width, height);

    return (
      <Layer>
        <Path
          data={PATH}
          name="FloorGood"
          x={0}
          y={0}
          scaleX={scaleX}
          scaleY={scaleY}
          fill="#bad80a"
          stroke="#107c10"
          strokeWidth={3}
          dash={[12, 6]}
          opacity={0.5}
        />
      </Layer>
    );
  }
}