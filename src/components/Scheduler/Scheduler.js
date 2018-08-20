import React from 'react';
import Title from './Title';
import Chart from './Chart/index';
import './Scheduler.css';

export default class Scheduler extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    /* Renders a schdule component */
    
    let { date, start, end, title } = this.props;     // Proposed event props
    let { room_schedule, room_number } = this.props;  // Existing events
    let { onChange } = this.props;                    // Changing events

    return (
      <div className="Scheduler">
        <Title
          room_number={room_number}
          date={date}
          onChange={onChange}
        />
        <Chart
          new_event={{date, start, end, title}}
          room_schedule={room_schedule}
        />
      </div>
    );
  }
}