import React from 'react';
import { Dropdown, Spinner, SpinnerSize } from 'office-ui-fabric-react';


// Dropdown Option renderer
const renderRoomOption = (room) => {
  // Inline dropdown list option styling
  const span_style = { 
    "width"       : "100px",
    "height"      : "100px",
    "borderRadius": "50px",
    "background"  : "#333333ee",
    "color"       : "#fff",
    "fontFamily"  : "sans-serif",
    "fontWeight"  : "bold",
    "fontSize"    : "14px"
  };

  return (
    <div className="dropdownOption" key={`${room.roomNumber}`}>
      <span style={span_style}>
        <strong>&nbsp;{room.floor}&nbsp;</strong>
      </span>&nbsp;&nbsp;&nbsp;
      Room: {room.roomNumber}
    </div>
  );
}

// Loading indicator
const renderLoading = () => {
  return (
    <div className="dropdownOption" key={'loadingSpinner'}>
      <Spinner
        label={'Loading rooms...'}
        size={SpinnerSize.medium}
      />
    </div>
  );
}


export default class RoomsList extends React.PureComponent {
  render() {
    // Create a copy and transform rooms into consumable options
    const room_options = this.props.rooms
      .slice()
      .sort((a, b) => +a.floor - +b.floor)
      .map(d => { 
        d.key = d.roomNumber;
        d.text = `${d.floor} - ${d.roomNumber}`;
        return d;
      });

    return (
      (this.props.rooms_loading === true) ?
        renderLoading() :
        <Dropdown
          placeholder={"Add a room"}
          label={"Room Number"}
          selectedKeys={(this.props.value !== '') ? [this.props.value] : []}
          onChanged={(evt) => this.props.onChange('room_number', evt.roomNumber)}
          options={room_options}
          onRenderOption={renderRoomOption}
          required={true} 
        />
    );
  }
}