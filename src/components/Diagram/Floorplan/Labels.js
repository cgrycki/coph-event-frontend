import React              from 'react';
import { Layer, Text }    from 'react-konva';
import { scaleLinear }    from 'd3-scale';
import FloorplanFunctions from '../utils/FloorplanFunctions';


const pathNames = [
  "DEPT_ADMIN",
  "DEPT_STUDENT",
  "DEPT_IT",
  "CLASS_N120",
  "CLASS_N110"
];

export default class Labels extends React.Component {
  
  getPosition = label => {
    const positions = {
      DEPT_ADMIN  : [570, 1100],
      DEPT_STUDENT: [200, 350],
      DEPT_IT     : [550, 350],
      CLASS_N120  : [980, 350],
      CLASS_N110  : [1400, 350]
    };

    return positions[label];
  }

  getLabel = label => {
    const labels = {
      DEPT_ADMIN  : 'Administration\nS160',
      DEPT_STUDENT: 'Student Services\nN170',
      DEPT_IT     : 'Information Technology\nOffice\nN140',
      CLASS_N120  : 'Callaghan Auditorium\nN120',
      CLASS_N110  : 'Ellig Auditorium\nN110'
    }
    return labels[label];
  }

  render() {
    // Get variables to scale floorplan points to current diagram dimensions
    const { width, height } = this.props;
    const rescaleX = scaleLinear().domain([0, 1920]).range([0, width]);
    const rescaleY = scaleLinear().domain([0, 1500]).range([0, height]);

    // Get scales for font sizes
    const { scaleX, scaleY } = FloorplanFunctions.resizeImageDimensionsToCanvas(width, height);

    return (
      <Layer name="labelLayer">
        {pathNames.map(path => {
          const pos = this.getPosition(path);
          const x   = rescaleX(pos[0])
          const y   = rescaleY(pos[1])
          const tex = this.getLabel(path);

          return (
            <Text
              key={path}
              text={tex}
              x={x}
              y={y}
              scaleX={scaleX}
              scaleY={scaleY}
              align={'center'}
              verticalAlign={'middle'}
              fontSize={18}
              fontFamily={'Segoe UI'}
            />
          );
        })}
      </Layer>
    );
  }
}