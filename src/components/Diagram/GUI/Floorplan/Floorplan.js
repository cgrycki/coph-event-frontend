/** SVG Path data taken from Illustrator. */
// Dependencies
import React              from 'react';
import { Layer, Path }    from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';


// Path data
const EXTERIOR_WALLS     = 'M1325.33,1380,1282,1420l-184.67-143.33-846.67,88L197.33,875.33,295.2,865.2,282.2,745,184,754.67,166,596.2H71.5V96l767.17-4V78.67L998,32.67h106v62l594,2,.67,489.33,60,.67L1856,1017.33l-90.67,419.33-11.77-1.52ZM220.4,750.49l13.33,120.67M1817.37,1196l-58-12.67L1743.5,1266l56,12.42m-4.94-532.71-58.11,13.54L1755,840l58-12.87';
const FLOOR_GOOD         = 'M1770.9,736.66,1699.33,750,1723,855.9l-169,18.4-1-14.3-135-30.9-4-14.1-18.5-17h-25.2L1348,814l-215.62-49.84L1041,777.55,748.9,810l-9.4-84,159.4-18.5L894.75,628h853.3Z';
const CLASSROOM_AND_CAFE = 'M1105.43,775.63,1117,774.4l249,52.9,4.4,41.8,3.3-.4.3,2.8-2.6.3,32.7,306.8,65.1-6.9-13.4-126.8-39.6,3.8-.3-2.4,39.6-4.6-9.4-89.2-39.7,3.8-.3-2.8,47.8-5.1-8.8-83.9-44.6,4.7-.4-3.3,13.9-1.4-2.9-27.6,122.5,26.5,1.3,12.7-28.4,2.9-2.2-19-5.5-1.2-49.9,5.7,17.5,172.1,56.3-5.5-.4-4.4,27.5-2.9,14.7,140.4-414,44.4Z';
const ADMIN              = 'M1042.9,785.4l52.4,482.9-837.5,87.8L204.4,872.6Z';
const STUDENT_SERVICES   = 'M460.9,588.8H76.3V100.7l289.2-2.4h0V284h95.4l.6,158.8Z';
const IT_OFFICE          = 'M417.2,97.9h0l420.7-3.5,1.3,345.9H754.3v-29H671.2V588.8H460.9l.6-146h89.3V238H417.2Z';
const N110               = 'M1319.5,588.8V526.1h-9.1V96.7H1698l1.3,496.3-379.8-4.2-12.1.5';
const N120               = 'M1278.5,588.8V176.4L1212.4,120l-20.6-17.6H981.5l-86.7,74.7-.1,411.7h383.8Z';
const STAIRS             = 'M877.4,670.8l.8,7.5m-49.4-2.5,3.2,31.7m-10.4-31,3.2,31.7m-10.5-30.9,3.2,31.7M807,678l3.2,31.7m-10.4-31,3.2,31.7m-10.5-30.9,3.2,31.7m-10.5-31,3.2,31.7m-10.4-31,3.2,31.8m-10.5-31,3.2,31.7m-17.8-30.2,3.3,31.7m4-32.5,3.2,31.7m100.7-10.2L752.1,715.6l-3.2-31.7,132.6-13.5m-15.1,35.4L744.3,718.2l-.1-1.5,122.9-12.4m14.6-34.2L740.9,684.3l-.1-1.4,141.5-14.4m780.4,750.9-1.5-.3,28-131.3,1.4.3-27.9,131.3M1413.9,1229l275,58.4m0,0,.3-1.5m0,0-275-58.4m-161.37,16.83,160.81-16.9.16,1.49L1253,1245.82Zm-13.33,16.77,99.8,77.2m0,0,89.1,11.7m0,0,.2-1.5m0,0-88.8-11.6m0,0-99.4-77m0,0-.9,1.2m.88-1.25,11.57-14.94,1.19.92-11.57,14.94Zm-21.08,27.25,107,82.8m0,0,98.9,12.8m0,0-.2,1.5m0,0-99.3-12.9m0,0-107.3-83m0,0,.9-1.2m0,0h0m512.4-150.7,30.6-144.2m-32.1,143.9,30.7-144.2m0,0,1.4.3m.8-.5,66.6,14.1m-66.3-15.6,66.6,14.2m-66.9-12.7.3-1.5m-1.2,152.7,24.6-115.6m-23.1,115.9,24.2-114.2m-1.1-1.7,6.8,1.4m-5.7.3,3.9.9m38.4-23.3,1.5.3m-2-1.1.3-1.4m-18.3,96.4,20-93.9m-19.8,86.1,18.3-86.4m-56.6,116.3,20-94.2m-21.8,95.2,20-94m-60.1,106.5-1.5-.3m32,6.8,1.5.3m48.2-50.2,1.4.3m-490.2,232.5-.5.7m-.5.7-18.1,23.3m-.5.7-.5.6m14.3-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.6.6-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.5.6m14.3-30.5-.5.7m-.5.7-18.1,23.3m-.5.7-.5.6m14.3-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.7m-.5.6-18.1,23.4m-.5.6-.5.7m14.4-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.6.6m14.4-30.4-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m14.3-30.5-.5.7m-.5.6-18.1,23.4m-.5.7-.5.6m14.4-30.5-.5.7m-.5.6-18.2,23.4m-.5.7-.5.6m14.4-30.4-.5.6m-.5.7-18.1,23.3m-.5.7-.5.7m14.3-30.5-.5.6m-.5.7-18.1,23.4m-.5.6-.5.7m127.6,45.2v.1m-.2,1.4-.1.9m0,.4-3.9,29.7m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.9,29.7m-.1.8-.1.8m11.7-33.2h0m-.2,1.5-.1.9m-.1.4-3.8,29.7m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.2.8m0,.5-3.9,29.7m-.1.8-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.1.8m11.6-33.1h0m-.2,1.5-.1.8m0,.5-3.9,29.6m-.1.9-.1.8m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.1.8m11.6-33.2v.1m-.2,1.5-.1.8m0,.5L1402,1378m-.1.8-.1.9m11.7-33.2h0m-.2,1.5-.1.8m-.1.5-3.8,29.7m-.1.8-.2.8m11.7-33.2v.1m-.2,1.4-.1.9m-.1.5-3.8,29.6m-.1.8-.1.9m316.9-252.2.8.2m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.1,27.3,5.8m.8.2.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.1,27.3,5.9m.8.1.9.2m-29.1-13.7.9.2m.8.2,27.3,5.8m.8.2.8.1m-29-13.6.8.2m.8.2,27.3,5.7m.8.2.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.9.2,27.2,5.8m.9.1.8.2m-29.1-13.6.9.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-29-13.6.8.1m.8.2,27.3,5.8m.8.2.8.2m-29-13.7.8.2m.8.2,27.3,5.8m.8.1.8.2m-27.5-20.8.9.2m.8.2,27.3,5.8m.8.2.8.1m26.8,57.4-.8-.2m-.8-.2-27.3-5.8m-3.2,7.4h0m2.4-7.6-.8-.1m32.1-.7-.8-.2m-.9-.1-27.3-5.8m-.8-.2-.8-.2m32.1-.6-.8-.2m-.8-.2-27.3-5.8m30.4-1-.8-.2m-.8-.1-27.3-5.8m-.8-.2-.8-.2m32-.6-.8-.2m-.8-.2-27.3-5.8m-.8-.2-.8-.1m32-.7-.8-.2m-.8-.1-27.3-5.8m-.8-.2-.8-.2m32.1-.6-.8-.2m-.9-.2-27.2-5.8m-.9-.2-.8-.1m32.1-.7-.8-.2m-.9-.1-27.2-5.8m-.8-.2-.9-.2m-25.8,84.2.8.1m-14-84.4.8.2m.9.1,27.2,5.8m.9.2.8.2';

const pathNames          = ['FloorGood', 'ClassroomAndCafe', 'Admin', 'StudentServices', 'IT', 'N110', 'N120', 'Stairs', 'ExteriorWalls'];

export default class Floorplan extends React.Component {

  /** Returns SVG path data as a string */
  getPath = name => {
    const paths = {
      FloorGood       : FLOOR_GOOD,
      ExteriorWalls   : EXTERIOR_WALLS,
      ClassroomAndCafe: CLASSROOM_AND_CAFE,
      Admin           : ADMIN,
      StudentServices : STUDENT_SERVICES,
      IT              : IT_OFFICE,
      N110            : N110,
      N120            : N120,
      Stairs          : STAIRS
    };

    return paths[name];
  }

  getFill = name => {
    const fills = {
      FloorGood       : '#bad80a',
      ExteriorWalls   : '',
      ClassroomAndCafe: '#f8f8f8',
      Admin           : '#f8f8f8',
      StudentServices : '#f8f8f8',
      IT              : '#f8f8f8',
      N110            : '#f8f8f8',
      N120            : '#f8f8f8',
      Stairs          : ''
    };
    return fills[name];
  }

  getFillEnabled = name => {
    const fillEnabled = {
      FloorGood       : true,
      ExteriorWalls   : false,
      ClassroomAndCafe: true,
      Admin           : true,
      StudentServices : true,
      IT              : true,
      N110            : true,
      N120            : true,
      Stairs          : false
    };
    return fillEnabled[name];
  }

  getStroke = name => {
    const strokes = {
      FloorGood       : '#107c10',
      ExteriorWalls   : '#666666',
      ClassroomAndCafe: '#a6a6a6',
      Admin           : '#a6a6a6',
      StudentServices : '#a6a6a6',
      IT              : '#a6a6a6',
      N110            : '#a6a6a6',
      N120            : '#a6a6a6',
      Stairs          : '#a6a6a6',
    };
    return strokes[name];
  }

  getStrokeWidth = name => {
    const widths = {
      FloorGood       : 3,
      ExteriorWalls   : 15,
      ClassroomAndCafe: 3,
      Admin           : 3,
      StudentServices : 3,
      IT              : 3,
      N110            : 3,
      N120            : 3,
      Stairs          : 1
    };
    return widths[name];
  }

  getDash = name => {
    const dashes = {
      FloorGood       : [12, 6],
      ExteriorWalls   : [0, 0],
      ClassroomAndCafe: [0, 0],
      Admin           : [0, 0],
      StudentServices : [0, 0],
      IT              : [0, 0],
      N110            : [0, 0],
      N120            : [0, 0],
      Stairs          : [0, 0],
    };
    return dashes[name];
  }

  render() {
    const { width, height } = this.props;
    const { scaleX, scaleY }      = FloorplanFunctions.resizeImageDimensionsToCanvas(width, height);
    
    return (
      <Layer name="Floorplan">
        {pathNames.map(name => {
          // Shape attributes
          const pathData    = this.getPath(name);
          const fill        = this.getFill(name);
          const fillEnabled = this.getFillEnabled(name);
          const stroke      = this.getStroke(name);
          const strokeWidth = this.getStrokeWidth(name);
          const dash        = this.getDash(name);
          
          return (
            <Path
              key={name}
              name={name}
              x={0}
              y={0}
              scaleX={scaleX}
              scaleY={scaleY}
              data={pathData}
              fill={fill}
              fillEnabled={fillEnabled}
              stroke={stroke}
              strokeWidth={strokeWidth}
              dash={dash}
            />
          );
        })} 
      </Layer>
    );
  }
}


