import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';


export default class RoomDropdown extends Component {
  filterRooms = () => {
    const { checkedFeatures, rooms } = this.props;

    // Check for empty filter
    if (checkedFeatures.size === 0) return rooms;

    let roomsWithFeatures = [];
    rooms.forEach(rm => {
      if (rm.hasOwnProperty('featureList')) {
        for (let ft of rm.featureList) {
          if (checkedFeatures.has(ft)) {
            roomsWithFeatures.push(rm);
            break;
          };
        };
      };
    });

    return roomsWithFeatures;
  }

  createOption = room => {
    const displayName = (room.roomNumber === 'XC100') ? room.roomName : room.roomNumber;
  
    return (
      <div key={`RoomOption--${room.roomNumber}`} className="RoomList--RoomOption">
        <div>
          <span className="RoomList--RoomFloor"><strong>{room.floor}</strong></span>
          {displayName}{' '}<i>seats: {room.maxOccupancy}</i>
        </div>
        <div>
          <i>{room.rmType}</i>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Dropdown
        label="Room Number"
        placeholder="Select a Room from the dropdown list"
        options={this.filterRooms()}
        onRenderOption={this.createOption}
      />
    );
  }
}