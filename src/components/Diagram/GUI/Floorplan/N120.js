import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';

const PATH = 'M1278.5,588.8V176.4L1212.4,120l-20.6-17.6H981.5l-86.7,74.7-.1,411.7h383.8Z';

export default class N120 extends React.Component {
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