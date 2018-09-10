import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';

const PATH = 'M460.9,588.8H76.3V100.7l289.2-2.4h0V284h95.4l.6,158.8Z';


export default class StudentServices extends React.Component {
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


