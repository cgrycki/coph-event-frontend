import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';


export default class RoomDropdown extends Component {
  /** Filters the rooms list based on inclusion of it's features in the `checkedFeatures` set passed by props. */
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

  /** Maps our rooms list to a Fabric UI acceptable list by adding `key` and `text` attributes. */
  createOptions = rooms => {
    return rooms
      .slice()
      .sort((a, b) => +a.floor - +b.floor)
      .map(rm => {
        rm.key = rm.roomNumber; rm.text = rm.roomNumber;
        return rm;
      });
  }

  /** Renders a room for the dropdown. */
  renderOption = room => {
    const displayName = (room.roomNumber === 'XC100') ? room.roomName : room.roomNumber;
    return (
      <div key={room.key} className="RoomList--RoomFlexOption">
        <div className="RoomList--RoomFloorWrapper">
          <div className="RoomList--RoomFloorF">{room.floor}</div>
        </div>
        <div className="RoomList--RoomName">{displayName}</div>
        <div className="RoomList--RoomSeats">seats:{' '}{room.maxOccupancy}</div>
        <div className="RoomList--RoomType">{room.rmType}</div>
      </div>
    );
  }

  render() {
    const { value, error, onChange } = this.props;
    const filteredRooms              = this.filterRooms();
    const dropdownOptions            = this.createOptions(filteredRooms);

    return (
      <Dropdown
        label="Room Number"
        placeHolder="Select a Room from the dropdown list"
        options={dropdownOptions}
        onRenderOption={this.renderOption}
        selectedKey={value}
        errorMessage={error}
        onChanged={rm => onChange('room_number', rm.roomNumber)}
        required
      />
    );
  }
}