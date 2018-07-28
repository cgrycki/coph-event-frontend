import React from 'react';
import { Dropdown, Spinner, SpinnerSize, Icon } from 'office-ui-fabric-react';


export default class RoomsList extends React.PureComponent {
  renderCarat() { 
    return <Icon iconName="CirclePlus" />;
  }

  renderLoadingSpinner() {
    return (
      <div className="dropdownOption" key={'loadingSpinner'}>
        <Spinner
          label={'Loading rooms...'}
          size={SpinnerSize.medium}
        />
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
    // Renders an dropdown menu option

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
        </span>
        Room: {room.roomNumber}
      </div>
    );
  }

  render() {
    // Create a copy and transform rooms into consumable options
    const room_options = this.props.rooms
      .slice()
      .sort((a, b) => +a.floor - +b.floor)
      .map(d => { 
        d.key = d.roomNumber;
        d.text = `${d.floor} - ${d.roomName}`;
        return d;
      });

    return (
      (this.props.rooms_loading === true) ?
        this.renderLoadingSpinner() :
        <Dropdown
          placeholder={"Add a room"}
          label={"Room Number"}
          selectedKeys={(this.props.value !== '') ? [this.props.value] : []}
          onChanged={(evt) => this.props.onChange('room_number', evt.roomNumber)}
          options={room_options}
          onRenderOption={this.renderOption}
          onRenderCaretDown={this.renderCarat}
          onRenderPlaceHolder={this.renderPlaceholder}
          required={true} 
        />
    );
  }
}