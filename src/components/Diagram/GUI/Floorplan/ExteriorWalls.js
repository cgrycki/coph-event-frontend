import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';

const PATH = 'M1325.33,1380,1282,1420l-184.67-143.33-846.67,88L197.33,875.33,295.2,865.2,282.2,745,184,754.67,166,596.2H71.5V96l767.17-4V78.67L998,32.67h106v62l594,2,.67,489.33,60,.67L1856,1017.33l-90.67,419.33-11.77-1.52ZM220.4,750.49l13.33,120.67M1817.37,1196l-58-12.67L1743.5,1266l56,12.42m-4.94-532.71-58.11,13.54L1755,840l58-12.87';
const FLOOR_WIDTH = 1920;
const FLOOR_HEIGHT= 1500;


export default class ExteriorWalls extends React.Component {
  render() {
    const { width, height } = this.props;
    const { scaleX, scaleY } = FloorplanFunctions.resizeImageDimensionsToCanvas(width, height);

    return (
      <Layer>
        <Path
          data={PATH}
          x={0}
          y={0}
          scaleX={scaleX}
          scaleY={scaleY}
          fillEnabled={false}
          stroke="#666666"
          strokeWidth={15}
        />
      </Layer>
    );
  }
}