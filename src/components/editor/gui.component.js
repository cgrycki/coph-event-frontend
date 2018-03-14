import React from 'react';
import { Stage, Layer, Circle } from 'react-konva';

export default class GUI extends React.Component {

  clickIntersects(event, callback) {
    /*
     * @method
     * @description Method to ~conditionally~ render a new item; if pos empty.
     * @param {event} - HTML click event triggered by Konva Stage (canvas click).
     * @param {callback} - Function to call if the pointer position is empty.
     * @returns Calls function if there is no intersection.
     */
    let canvas = this.refs.konvaCanvas.getStage();
    let mousePos = canvas.getPointerPosition();
    let intersecting = canvas.getIntersection(mousePos);

    return (intersecting === null) ? callback(event) : null;
  }

  render() {
    const circles = this.props.circle.map((d, i) => {
      return (<Circle
        key={'circle' + i}
        id={d.item_id}
        name={'circle'}
        x={d.x}
        y={d.y} 
        radius={20}
        fill={'#eeeeee'}
        stroke={'#000000'}
        strokeWidth={3}
        draggable={true}
        onDragEnd={this.props.updateFurnItem}
        onDblClick={this.props.removeFurnItem}
        // onMouseEnter style.cursor = 'crosshair'
      />);
      /*return (<CircleFurn
          id={d.item_id}
          x={d.x}
          y={d.y} 
          updateFurnItem={this.props.updateFurnItem}
          removeFurnItem={this.props.removeFurnItem}
      />);*/
    });

    return (
      <Stage
        ref={"konvaCanvas"}
        width={500}
        height={500}
        onContentClick={(event) => this.clickIntersects(event, this.props.addFurnItem)}
      >
        <Layer></Layer>
        <Layer>{circles}</Layer>
      </Stage>
    );
  }
}