import React, { Component } from 'react';
import { Dropdown,   } from 'office-ui-fabric-react/lib/Dropdown';
import './Surfaces.css';


class BarButton extends Component {
  state = {
    isPressed: false,
    isHovered: false
  }

  onHover = () => this.setState({ isHovered: !this.state.isHovered });
  onClick = () => this.setState({ isPressed: !this.state.isPressed });


  render() {
    return (
      <div
        className="placeholder"
        onMouseOver={this.onHover}
        onMouseOut={this.onHover}
        onClick={this.onClick}
      />
    );
  }

}




export default class NewToolbar extends Component {


  render () {
    return (
      <div className="row-flex">
        <BarButton/>
        <BarButton/>
        <BarButton/>
      </div>
    );
  }
}