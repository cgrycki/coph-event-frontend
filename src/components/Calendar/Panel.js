import React          from 'react';
import { Checkbox }   from 'office-ui-fabric-react/lib/Checkbox';
import { Label }      from 'office-ui-fabric-react/lib/Label';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';


export default class Panel extends React.Component {
  constructor() {
    super();
    this.createCheckbox = this.createCheckbox.bind(this);
  }

  /** Creates a checkbox for a room. */
  createCheckbox(room) {
    const { checkedRooms, onCheck } = this.props;
    return (
      <div
        className="Calendar--CheckRow"
        key={room.roomNumber}
        onClick={() => onCheck(room.roomNumber)}
      >
        <Checkbox
          label={room.roomNumber}
          checked={checkedRooms.has(room.roomNumber)}
          onChange={() => onCheck(room.roomNumber)}
        />
      </div>
    );
  }

  render() {
    
    return (
      <div className="ms-Grid-col ms-sm12  ms-lg4">
        
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <DatePicker
              label={"Start"}
              isRequired={true}
              isMonthPickerVisible={false}
              value={this.props.start_date}
              onSelectDate={(evt) => this.props.onDateChange(evt, 'start_date')}
            />
            <DatePicker
              label={"End"}
              isRequired={true}
              isMonthPickerVisible={false}
              value={this.props.end_date}
              onSelectDate={(evt) => this.props.onDateChange(evt, 'end_date')}
            />
            <br/>
          </div>
        </div>
        
        <div className="ms-Grid-row">
          <Label required={true} style={{marginLeft: '10px'}}>Rooms</Label>
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12 CalendarPanel">  
            {this.props.rooms && this.props.rooms.map(this.createCheckbox)}
          </div>
        </div>
        
      </div>
    );
  }
}
