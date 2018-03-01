import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class Toolbar extends Component {
  constructor() {
    super();
    this.state = {
      'active': 'circle',
      'icons': ['circle', 'rectangle', 'bar', 'poster', 'trash']
    };

    this.renderButton = this.renderButton.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  renderButton(icon, active) {
    return (
      <Button
        key={icon + '-btn'}
        bsSize="small"
        bsStyle={this.state.active === icon ? "warning" : null}
        active={this.state.active === icon}
        onClick={this.onClick}
        value={icon}
      >
        {icon}
        <Glyphicon glyph={icon} />
      </Button>
    );
  }

  onClick(event) {
    const target = event.target;
    const value = target.value;
    this.setState({ active: value });
  }
  
  render() {
    return (
      <ButtonGroup>
        {this.state.icons.map(d => this.renderButton(d))}
      </ButtonGroup>
    );
  }
}