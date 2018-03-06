import React, { Component } from 'react';
import { Stage, Layer, Group, Rect } from "react-konva";

export default class Editor extends Component {
  constructor() {
    super();
    this.state = { width: 500, height: 500 };
  }

  componentDidMount() {
    // Resizes the canvas after we've established the layout.
    let canvas = this.refs.stage.getStage();
    let container = canvas.container();
    this.setState({ width: container.clientWidth });
  }

  render() {
    return (
      <Stage
        width={this.state.width}
        height={this.state.height}
        onContentClick ={this.props.onClick}
        onContentDblClick={this.props.onContentClick}
        onDragEnd={this.props.handleDragEnd}
        ref="stage"
      >
        <Layer>
        </Layer>
      </Stage>
    );
  }
}