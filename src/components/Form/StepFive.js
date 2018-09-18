// Dependecies
import React          from 'react';

// Components
import Diagram        from '../Diagram';
import LayoutSerialize from './LayoutSerialize';



export default class StepFive extends React.Component {
  render() {
    return(
      <React.Fragment>
        <Diagram draggable={true} />
        <LayoutSerialize />
      </React.Fragment>
    );
  }
}