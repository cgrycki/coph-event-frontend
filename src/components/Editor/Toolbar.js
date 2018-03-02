import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class Toolbar extends Component {
  constructor() {
    super();
    this.state = {'icons': ['Circular', 'Rectangle', 'Bar', 'Poster', 'TrashCan']};

    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(icon, active) {
    return (
      <Button
        key={icon + '-btn'}
        name={"SelectedFurniture"}
        bsSize="small"
        bsStyle={this.props.SelectedFurniture === icon ? "warning" : null}
        active={this.state.SelectedFurniture  === icon}
        onClick={this.props.onClick}
        value={icon}
      >
        {icon}
        <Glyphicon glyph={icon} />
      </Button>
    );
  }
  
  render() {
    return (
      <ButtonGroup>
        {this.state.icons.map(d => this.renderButton(d))}
      </ButtonGroup>
    );
  }
}