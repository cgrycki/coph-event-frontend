import React from 'react';
import { Dropdown, Spinner, SpinnerSize, Icon, Label } from 'office-ui-fabric-react';


export default class RoomsList extends React.PureComponent {
  renderCarat() { 
    return <Icon iconName="CirclePlus" />;
  }

  renderLoadingSpinner() {
    return (
      <div className="dropdownOption" key={'loadingSpinner'}>
        <Label required={true}>Room Number</Label>
        <Spinner size={SpinnerSize.small}/>
      </div>
    );
  }

  renderPlaceholder() {
    return (
      <div className="dropdownOption" key={"dropdownPlaceholder"}>
        <span>Select a room from the dropdown menu</span>
      </div>
    );
  }

  renderOption(room) {
    /* Renders an dropdown menu option */

    // Option div styling
    const option_style = {
      "minHeight"     : "24px",
      "padding"       : "5px 0px",
      "display"       : "flex",
      "justifyContent": "space-between",
      "alignItems"    : "baseline",
      "width"         : "100%"
    };

    // Inline dropdown list option styling
    const floor_style = {
      "lineHeight"  : "24px",
      "width"       : "24px",
      "height"      : "24px",
      "borderRadius": "12px",
      "background"  : "#555555",
      "color"       : "#fff",
      "fontFamily"  : "sans-serif",
      "fontWeight"  : "bold",
      "fontSize"    : "1.4em",
      "textAlign"   : "center",
      "marginRight" : "16px",
      "display"     : "inline-block",
      "boxSizing"   : "border-box"
    };

    return (
      <div key={`${room.roomNumber}`} style={option_style}>
        <div>
          <span style={floor_style}><strong>{room.floor}</strong></span>
          {room.roomName}
        </div>
        <div>
          <i>{room.rmType}</i>
        </div>
      </div>
    );
  }

  render() {
    let { rooms, rooms_loading, rooms_error, value, onChange } = this.props;

    // Create a copy and transform rooms into consumable options
    const room_options = rooms.slice()
      .sort((a, b) => +a.floor - +b.floor)
      .map(d => {
        d.key = d.roomNumber;
        d.text = `${d.roomName}`;
        return d;
      });

    return (
      (rooms_loading && rooms.length === 0) ? 
        this.renderLoadingSpinner() :
        <Dropdown
          placeholder={"Add a room"}
          label={"Room Number"}
          selectedKey={value}
          //errorMessage={rooms_error}
          onChanged={(evt) => onChange('room_number', evt.roomNumber)}
          options={room_options}
          onRenderOption={this.renderOption}
          onRenderCaretDown={this.renderCarat}
          onRenderPlaceHolder={this.renderPlaceholder}
          required
        />
    );
  }
}