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
      width: 500,
      height: 500
    }
  }

  componentDidMount() {
    let stage = this.refs.stage.getStage();

    // Add event listeners
    stage.on('dragend', this.props.handleDragEnd);
    
    // Get dimensions
    let container = stage.container();
    this.setState({
      width: container.clientWidth,
      height: container.clientHeight
    });
    stage.setHeight(container.clientHeight);
    stage.setWidth(container.clientWidth);
    //console.log(this.state, container, container.clientHeight, container.clientWidth);


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
            console.log(this);
            let box_attrs = this.getAttrs();
            let new_w = box_attrs.width * 2;
            let new_h = box_attrs.height * 2;
            this.setAttrs({'width': new_w, 'height': new_h});
            
            //this.destroy();
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

    // Temp table group
    function make_table(x, y) {
      let group = new Konva.Group({
        x: x,
        y:y,
        draggable: true
      });

      let table = new Konva.Circle({
        radius: 20,
        fill: '#dddddd',
        stroke: '#000000',
        strokeWidth: 4
      });
      group.on("dragstart", function() { 
        this.moveToTop();
        layer.draw();
        console.log(this);
      });
      group.on('contextmenu', function (event) {
        event.preventDefault();
        this.destroy();
      })

      group.add(table);

      return group;
    }
    // Dont trigger empyy space
    //stage.on('click', function() { console.log('usual click: ' + JSON.stringify(stage.getPointerPosition())); });
    // Trigger all
    stage.on('contentClick', function() {
      let position = stage.getPointerPosition();
      if (stage.getIntersection(position) !== null) return null;

      let new_table = make_table(position.x, position.y);
      layer.add(new_table);
      stage.draw();
    });
    

    // add the layer to the stage
    stage.add(layer);
    stage.batchDraw();
  }

  render() {
    return (
      <Stage
        width={this.state.width}
        height={this.state.height}
        ref="stage"
      />
    );
  }
}

