import React from 'react';
import { Stage, Layer } from 'react-konva';

import FurnitureContainer from '../../containers/furniture.container';
import { canvasClickPos, haveIntersection, getClickedShapeAttrs } from '../../utils/';
import { styleTypes } from '../../constants';

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

  handleClick(event) {
    /* Delegates a click action to Redux actions */
    let canvas = this.refs.konvaCanvas.getStage();
    let mousePos = canvas.getPointerPosition();
    let intersecting = canvas.getIntersection(mousePos);

    if (intersecting) {
      this.props.updateFurnFocus(getClickedShapeAttrs(event));
    } else {
      this.props.addFurnItem(mousePos);
    }
    
    return null;
  }

  handleDragMove(event) {
    // Gather variables
    let furnitureLayer = this.refs.furnitureLayer;
    let target = event.target.getParent();
    let targetRect = event.target.getClientRect();

    // Move item to top so it's not occluded
    target.moveToTop();

    // Find intersecting shapes
    furnitureLayer.children.each((group) => {        
        if (group.getAttr('id') === target.getAttr('id')) {
          // Skip self
          return;
        } else if (haveIntersection(group.getClientRect(), targetRect)) {
          // Color 
          group.findOne('.furnItem').setAttrs({
            stroke: styleTypes.error.stroke,
            fill: styleTypes.error.fill
          });
          target.findOne('.furnItem').setAttrs({
            stroke: styleTypes.error.stroke,
            fill: styleTypes.error.fill
          });
        } else { 
          group.findOne('.furnItem').setAttrs({
            stroke: styleTypes.normal.stroke,
            fill: styleTypes.normal.fill
          });
          target.findOne('.furnItem').setAttrs({
            stroke: styleTypes.focused.stroke,
            fill: styleTypes.focused.fill
          });
        }
    });
  }

  render() {
    const konva_items = this.props.furn_items.map((d, i) => {
      return (
        <FurnitureContainer 
          key={d.item_id + '-Component'}
          item_id={d.item_id}
          furn_type={d.furn_type}
          focusedFurnId={this.props.focusedFurnId}
          x={d.x}
          y={d.y}
        />
      );
    });

    return (
      <Stage
        ref={"konvaCanvas"}
        width={500}
        height={500}
        //onContentClick={(event) => this.clickIntersects(event, this.props.addFurnItem)}
        onContentClick={(event) => this.handleClick(event)}
      >
        <Layer ref={"floorplanLayer"} />
        <Layer ref={"furnitureLayer"}
          onDragMove={this.handleDragMove.bind(this)}
        >
          {konva_items}
        </Layer>
      </Stage>
    );
  }
}