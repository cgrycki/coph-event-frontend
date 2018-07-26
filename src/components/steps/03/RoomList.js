import React from 'react';
import { Dropdown } from 'office-ui-fabric-react';


// Option renderer
const renderRoomOption = (room) => {
  const float_right = { "float": "right" };
  return (
    <div className="dropdownOption" key={`room-$room.roomNumber`}>
      Number: {room.roomNumber} 
      <span style={float_right}>
        <strong>Floor: {room.floor}</strong>
      </span>
    </div>
  );
}
// Another one
const render2 = (room) => ({
  key: `room-${room.roomNumber}`,
  text: `${room.floor}:  ${room.roomNumber}`
});


export default class RoomsList extends React.PureComponent {
  render() {
    //const room_options = this.props.rooms.map((d, i) => renderRoomOption(d, i));
    const room_options = this.props.rooms.map(d => render2(d));

    return (
      <Dropdown
        placeholder={"Add a room"}
        label={"Room Number"}
        selectedKeys={[this.props.value]}
        onChanged={(evt) => this.props.onChange('room_number', evt)}
        options={room_options}
        //onRenderOption={renderRoomOption}
        required={true} 
      />
    );
  }
}