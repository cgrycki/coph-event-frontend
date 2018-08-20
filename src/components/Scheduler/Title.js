import React          from 'react';
import { IconButton } from 'office-ui-fabric-react';
import { dateDelta }  from '../../utils/date.utils.js';


export default class Title extends React.Component {
  constructor(props) {
    super();
  }
  
  /** Computes the next/previous date and executes function to dispatch a store update. */
  handleClick(delta) {
    const { date, onChange } = this.props;  // Props are passed down from the scheduler
    const newDate = dateDelta(date, delta); // Compute new date
    return onChange('date', newDate);       // Fire the dispatch action
  }

  render() {
    return (
      <div className="ms-Grid-row">
        <span>
          <IconButton 
            iconProps={{ iconName: "chevronLeftSmall" }}
            title="Previous"
            onClick={() => this.handleClick(-1)}
          />
          {' '}
          <IconButton 
            iconProps={{ iconName: "chevronRightSmall" }}
            title="Next"
            onClick={() => this.handleClick(1)}
          />
          {' '}
          <span className="ms-font-weight-semilight ms-font-color-neutralPrimary">
            {this.props.room_number} Schedule
          </span>
        </span>
      </div>
    );
  }
}