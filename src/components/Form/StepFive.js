// Dependecies
import React          from 'react';

// Components
import Editor         from '../Diagram2';



export default class StepFive extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(<Editor draggable={true} />);
  }
}