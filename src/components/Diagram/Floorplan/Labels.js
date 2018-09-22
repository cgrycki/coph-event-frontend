import React              from 'react';
import { Layer, Text }    from 'react-konva';
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
      DEPT_ADMIN  : [285, 550],
      DEPT_STUDENT: [100, 175],
      DEPT_IT     : [275, 175],
      CLASS_N120  : [490, 175],
      CLASS_N110  : [700, 175]
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
    const { width, height } = this.props;
    const { scaleX, scaleY } = FloorplanFunctions.resizeImageDimensionsToCanvas(width, height);

    return (
      <Layer name="labelLayer">
        {pathNames.map(path => {
          const pos = this.getPosition(path);
          const tex = this.getLabel(path);

          return (
            <Text
              key={path}
              draggable
              onDragEnd={evt => console.log(evt.target.position())}
              text={tex}
              x={pos[0]}
              y={pos[1]}
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