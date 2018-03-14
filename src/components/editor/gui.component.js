import React from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import FurnitureComponent from './furniture/furniture.component';

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

  handleInteraction(event, callback) {
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
    console.log(this);
    const furn_items = [
      ...this.props.circle,
      ...this.props.rect,
      ...this.props.bar,
      ...this.props.poster,
      ...this.props.trash
    ];

    const konva_items = furn_items.map((d, i) => {
      return (
        <FurnitureComponent 
          key={d.item_id + '-Component'}
          item_id={d.item_id}
          furn_type={d.furn_type}
          focused={d.focused}
          x={d.x}
          y={d.y}
          updateFurnItem={this.props.updateFurnItem}
          removeFurnItem={this.props.removeFurnItem}
        />
      );
    });

    return (
      <Stage
        ref={"konvaCanvas"}
        width={500}
        height={500}
        //onContentClick={(event) => this.clickIntersects(event, this.props.addFurnItem)}
        onContentClick={(event) => this.clickIntersects(event, this.props.addFurnItem)}
      >
        <Layer></Layer>
        <Layer>{konva_items}</Layer>
      </Stage>
    );
  }
}