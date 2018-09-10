import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';

const PATH = 'M1105.43,775.63,1117,774.4l249,52.9,4.4,41.8,3.3-.4.3,2.8-2.6.3,32.7,306.8,65.1-6.9-13.4-126.8-39.6,3.8-.3-2.4,39.6-4.6-9.4-89.2-39.7,3.8-.3-2.8,47.8-5.1-8.8-83.9-44.6,4.7-.4-3.3,13.9-1.4-2.9-27.6,122.5,26.5,1.3,12.7-28.4,2.9-2.2-19-5.5-1.2-49.9,5.7,17.5,172.1,56.3-5.5-.4-4.4,27.5-2.9,14.7,140.4-414,44.4Z';
const FLOOR_WIDTH = 1920;
const FLOOR_HEIGHT= 1500;


export default class ClassAndCafe extends React.Component {
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
          fill="#f8f8f8"
          stroke="#a6a6a6"
          strokeWidth={3}
        />
      </Layer>
    );
  }
}