import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';

const PATH = "M877.4,670.8l.8,7.5m-49.4-2.5,3.2,31.7m-10.4-31,3.2,31.7m-10.5-30.9,3.2,31.7M807,678l3.2,31.7m-10.4-31,3.2,31.7m-10.5-30.9,3.2,31.7m-10.5-31,3.2,31.7m-10.4-31,3.2,31.8m-10.5-31,3.2,31.7m-17.8-30.2,3.3,31.7m4-32.5,3.2,31.7m100.7-10.2L752.1,715.6l-3.2-31.7,132.6-13.5m-15.1,35.4L744.3,718.2l-.1-1.5,122.9-12.4m14.6-34.2L740.9,684.3l-.1-1.4,141.5-14.4m780.4,750.9-1.5-.3,28-131.3,1.4.3-27.9,131.3M1413.9,1229l275,58.4m0,0,.3-1.5m0,0-275-58.4m-161.37,16.83,160.81-16.9.16,1.49L1253,1245.82Zm-13.33,16.77,99.8,77.2m0,0,89.1,11.7m0,0,.2-1.5m0,0-88.8-11.6m0,0-99.4-77m0,0-.9,1.2m.88-1.25,11.57-14.94,1.19.92-11.57,14.94Zm-21.08,27.25,107,82.8m0,0,98.9,12.8m0,0-.2,1.5m0,0-99.3-12.9m0,0-107.3-83m0,0,.9-1.2m0,0h0m512.4-150.7,30.6-144.2m-32.1,143.9,30.7-144.2m0,0,1.4.3m.8-.5,66.6,14.1m-66.3-15.6,66.6,14.2m-66.9-12.7.3-1.5m-1.2,152.7,24.6-115.6m-23.1,115.9,24.2-114.2m-1.1-1.7,6.8,1.4m-5.7.3,3.9.9m38.4-23.3,1.5.3m-2-1.1.3-1.4m-18.3,96.4,20-93.9m-19.8,86.1,18.3-86.4m-56.6,116.3,20-94.2m-21.8,95.2,20-94m-60.1,106.5-1.5-.3m32,6.8,1.5.3m48.2-50.2,1.4.3m-490.2,232.5-.5.7m-.5.7-18.1,23.3m-.5.7-.5.6m14.3-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.6.6-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.5.6m14.3-30.5-.5.7m-.5.7-18.1,23.3m-.5.7-.5.6m14.3-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.7m-.5.6-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.6.6m14.4-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.5.6m14.4-30.5-.5.7m-.5.6-18.2,23.4m-.5.7-.5.6m14.4-30.4-.5.6m-.5.7-18.1,23.3m-.5.7-.5.7m14.3-30.5-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m127.6,45.2v.1m-.2,1.4-.1.9m0,.4-3.9,29.7m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.9,29.7m-.1.8-.1.8m11.7-33.2h0m-.2,1.5-.1.9m-.1.4-3.8,29.7m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.2.8m0,.5-3.9,29.7m-.1.8-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.1.8m11.6-33.1h0m-.2,1.5-.1.8m0,.5-3.9,29.6m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.1.8m11.6-33.2v.1m-.2,1.5-.1.8m0,.5L1402,1378m-.1.8-.1.9m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.2.8m11.7-33.2v.1m-.2,1.4-.1.9m-.1.5-3.8,29.6m-.1.8-.1.9m316.9-252.2.8.2m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.1,27.3,5.8m.8.2.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.1,27.3,5.9m.8.1.9.2m-29.1-13.7.9.2m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.2,27.3,5.7m.8.2.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.9.2,27.2,5.8m.9.1.8.2m-29.1-13.6.9.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-27.5-20.8.9.2m.8.2,27.3,5.8m.8.2.8.1m26.8,57.4-.8-.2m-.8-.2-27.3-5.8m-3.2,7.4h0m2.4-7.6-.8-.1m32.1-.7-.8-.2m-.9-.1-27.3-5.8m-.8-.2-.8-.2m32.1-.6-.8-.2m-.8-.2-27.3-5.8m30.4-1-.8-.2m-.8-.1-27.3-5.8m-.8-.2-.8-.2m32-.6-.8-.2m-.8-.2-27.3-5.8m-.8-.2-.8-.1m32-.7-.8-.2m-.8-.1-27.3-5.8m-.8-.2-.8-.2m32.1-.6-.8-.2m-.9-.2-27.2-5.8m-.9-.2-.8-.1m32.1-.7-.8-.2m-.9-.1-27.2-5.8m-.8-.2-.9-.2m-25.8,84.2.8.1m-14-84.4.8.2m.9.1,27.2,5.8m.9.2.8.2";

export default class Stairs extends React.Component {
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
          stroke="#a6a6a6"
          strokeWidth={1}
        />
      </Layer>
    );
  }
}