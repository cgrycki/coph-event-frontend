import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';

const PATH = "M1042.9,785.4l52.4,482.9-837.5,87.8L204.4,872.6Z";

export default class Admin extends React.Component {
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