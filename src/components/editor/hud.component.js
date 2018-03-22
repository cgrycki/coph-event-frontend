import React from 'react';
import { DetailsList, CheckboxVisibility } from 'office-ui-fabric-react';

export default class HUD extends React.Component {
  render() {
    const { numChairs, numCircles, numRects, numBars, numPosters, numTrashs } = this.props;
    
    const hudItems = [
      {name: 'Capacity',            value: numChairs},
      {name: 'Circle Tables',       value: numCircles},
      {name: 'Rectangular Tables',  value: numRects},
      {name: 'Bar Tables',          value: numBars},
      {name: 'Posters',             value: numPosters},
      {name: 'Trash Cans',          value: numTrashs}
    ];

    return (
      <DetailsList 
        items={hudItems}
        checkboxVisibility={CheckboxVisibility.hidden}
        isHeaderVisible={false} /* Hide header until we settle on columns */
      />
    );
  }
};