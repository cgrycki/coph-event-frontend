
import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';

const PATH = "M1319.5,588.8V526.1h-9.1V96.7H1698l1.3,496.3-379.8-4.2-12.1.5";

export default class N110 extends React.Component {
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