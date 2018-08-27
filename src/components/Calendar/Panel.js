import React from 'react';
import {
  Checkbox,
  Label,
  DatePicker
} from 'office-ui-fabric-react';


export default class Panel extends React.Component {
  constructor() {
    super();
    this.createCheckbox = this.createCheckbox.bind(this);
  }

  /** Creates a checkbox for a room. */
  createCheckbox(room) {
    return (
      <div className="Calendar--CheckRow" key={room.roomNumber}>
        <Checkbox
          label={room.roomNumber}
          checked={this.props.checkedRooms.has(room.roomNumber)}
          onChange={() => this.props.onCheck(room.roomNumber)}
        />
      </div>
    );
  }

  render() {
    
    return (
      <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4 ms-xl4 ms-xxl4">
      
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
            <h2>Filters</h2>
          </div>
        </div>
        
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
            <DatePicker
              label={"Start"}
              isMonthPickerVisible={false}
              value={this.props.start_date}
              onSelectDate={(evt) => this.props.onDateChange(evt, 'start_date')}
            />
            <DatePicker
              label={"End"}
              isMonthPickerVisible={false}
              value={this.props.end_date}
              onSelectDate={(evt) => this.props.onDateChange(evt, 'end_date')}
            />
          </div>
        </div>
        
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
            <Label>Rooms</Label>
            {this.props.rooms && this.props.rooms.map(this.createCheckbox)}
          </div>
        </div>
        
      </div>
    );
  }
}
