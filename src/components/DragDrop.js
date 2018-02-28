/*
 * Drag and Drop container stub
 */

import React, { Component } from 'react';
import { Stage, Layer, Rect, Image, Group } from "react-konva";
import Konva from 'konva';
import { make_table, click_canvas, BaseTable, show_example } from './Tables';

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
    console.log(stage, container);

    this.setState({
      width: container.clientWidth,
      height: container.clientHeight
    });
    

    //stage.setHeight(container.clientHeight);
    //stage.setWidth(container.clientWidth);
    //console.log(this.state, container, container.clientHeight, container.clientWidth);


    show_example(stage);


    // Dont trigger empyy space
    //stage.on('click', function() { console.log('usual click: ' + JSON.stringify(stage.getPointerPosition())); });
    // Trigger all
    /*
    stage.on('contentClick', function() {
      let position = stage.getPointerPosition();
      if (stage.getIntersection(position) !== null) return null;

      let new_table = make_table2(position.x, position.y);
      layer.add(new_table);
      stage.draw();
    });*/
    //stage.on('contentClick', click_canvas);

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

