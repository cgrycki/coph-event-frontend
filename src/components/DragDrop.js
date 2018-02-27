/*
 * Drag and Drop container stub
 */

import React, { Component } from 'react';
import { Stage, Layer, Rect, Image, Group } from "react-konva";
import Konva from 'konva';

export default class DragDrop extends Component {
  constructor() {
    super();
    this.state = {
      width: null,
      height: null
    }
  }

  componentDidMount() {
    let stage = this.refs.stage.getStage();
    let container = stage.container();

    this.setState({
      width: container.clientWidth,
      height: container.clientHeight
    });
    stage.setHeight(this.state.height);
    stage.setWidth(this.state.width);

    var bg = new Konva.Rect({
      x: 5,
      y: 5,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 5,
      width: container.clientWidth-100,
      height: container.clientHeight-100
    });

    var layer = new Konva.Layer();

    var colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    for (var i = 0; i < 6; i++) {
        var box = new Konva.Rect({
            x: i * 30 + 50,
            y: i * 18 + 40,
            fill: colors[i],
            stroke: "black",
            strokeWidth: 4,
            draggable: true,
            width: 100,
            height: 50
        });

        box.on("dragstart", function() {
            this.moveToTop();
            layer.draw();
        });

        box.on("dragmove", function() {
            document.body.style.cursor = "pointer";
        });
        /*
           * dblclick to remove box for desktop app
           * and dbltap to remove box for mobile app
           */
        box.on("dblclick dbltap", function() {
            this.destroy();
            layer.draw();
        });

        box.on("mouseover", function() {
            document.body.style.cursor = "pointer";
        });
        box.on("mouseout", function() {
            document.body.style.cursor = "default";
        });

        layer.add(box);
    }

    // add the layer to the stage
    stage.add(layer);
    stage.batchDraw();
  }

  render() {
    return (
      <Stage width={700} height={700} ref="stage">
      </Stage>
    );
  }
}

