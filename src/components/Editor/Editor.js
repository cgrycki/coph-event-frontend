import React, { Component } from 'react';
import { Stage, Layer, Group, Rect } from "react-konva";

export default class Editor extends Component {
  constructor() {
    super();
    this.state = { width: 500, height: 500 };

    this.canvasZoom = this.canvasZoom.bind(this);
  }

  componentDidMount() {
    // Resizes the canvas after we've established the layout.
    let canvas = this.refs.stage.getStage();
    let container = canvas.container();
    this.setState({ width: container.clientWidth });
  }

  canvasZoom(event) {
    /*
     * @method
     * @description Method to handle zooming in on our canvas.
     */
    event.evt.preventDefault();

    let canvas = event.currentTarget,
      old_scale = canvas.scaleX();

    var mouse_pos_to = {
      x: canvas.getPointerPosition().x / old_scale - canvas.x() / old_scale,
      y: canvas.getPointerPosition().y / old_scale - canvas.y() / old_scale,
    };

    let new_scale = event.evt.deltaY < 0 ? old_scale * 1.1 : old_scale / 1.1;
    canvas.scale({ x: new_scale, y: new_scale });

    var new_pos = {
      x: -(mouse_pos_to.x - canvas.getPointerPosition().x / new_scale) * new_scale,
      y: -(mouse_pos_to.y - canvas.getPointerPosition().y / new_scale) * new_scale
    };

    canvas.position(new_pos);
    canvas.batchDraw();
  }

  render() {
    return (
      <Stage
        width={this.state.width}
        height={this.state.height}
        onWheel={this.canvasZoom}
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