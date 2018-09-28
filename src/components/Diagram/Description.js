import React, { Component } from 'react';


// Functional components
const indicator = 
  (<svg 
    style={{overflow: 'visible', margin: '0 0.2rem'}}
    width="1.2em"
    height="1.2em"
    fill="#a1d99b"
    fillOpacity="1"
    stroke="#006d2c"
    strokeWidth="1"
    strokeDasharray="5,2">
    <rect x={0} y={0} width='100%' height='100%' />
  </svg>
);
const pointer = <span style={{fontSize: '1.2rem', lineHeight: '1.2'}}>👉</span>;

const style = {
  wordBreak: 'break-word',
  lineHeight: 1.5
}

export default class Description extends Component {
  render() {
    return (
      <p style={style}>Place furniture items and plan your event by clicking in the {indicator} polygon. You can move and rotate furniture by clicking and dragging selected items. For more instructions, click the help button located in the Toolbar. {pointer}</p>
    );
  }
}