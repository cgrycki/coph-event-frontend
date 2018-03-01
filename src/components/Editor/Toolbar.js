import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

export default class Toolbar extends Component {
  constructor() {
    super();
    this.state = {'icons': ['circle', 'rectangle', 'bar', 'poster', 'trash']};

    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(icon, active) {
    return (
      <Button
        key={icon + '-btn'}
        name={"TableType"}
        bsSize="small"
        bsStyle={this.props.TableType === icon ? "warning" : null}
        active={this.state.TableType  === icon}
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