// Dependecies
import React          from 'react';

// Components
import Diagram        from '../Diagram';



export default class StepFive extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(<Diagram draggable={true} />);
  }
}