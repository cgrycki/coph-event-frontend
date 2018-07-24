import React from 'react';
import { Stage, Layer } from 'react-konva';

import FurnitureContainer from '../../containers/furniture.container';
import { changePointer, haveIntersection, getClickedShapeAttrs } from '../../utils/';
import { styleTypes } from '../../constants';

import FloorplanFunctions from '../../utils/point.utils';
import Floorplan from './floorplan.component';

export default class GUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 500,
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      floorplanFX: null
    };
  }

  componentDidMount() {
    /* Resizes Konva canvas to div size, retaining floorplan aspect ratio. */
    const canvas = this.refs.konvaCanvas.getStage();
    const container = canvas.getAttr('container');
    const containerWidth = container.clientWidth;

    const floorplanFX = new FloorplanFunctions(containerWidth);

    // Set updated dimensions
    this.setState({
      width: floorplanFX.canvasWidth,
      height: floorplanFX.canvasHeight,
      floorplanFX
    });
  }

  getScaledPos() {
    let canvas = this.refs.konvaCanvas.getStage(),
        canvasAttrs = canvas.attrs,
        pointerPos = canvas.getPointerPosition();
    
    const x = (pointerPos.x - canvasAttrs.x) / canvasAttrs.scaleX;
    const y = (pointerPos.y - canvasAttrs.y) / canvasAttrs.scaleY;
    return {x: x, y: y};
  }

  handleMouseAppearance() {
    /* Changes mouse pointer to give user affordances. */
    let canvas = this.refs.konvaCanvas.getStage();
    let mousePos = this.getScaledPos();

    // Our conditionals
    let validPosition = this.state.floorplanFX.ptInPolygon(mousePos);
    let intersecting = canvas.getIntersection(mousePos);

    if (intersecting) changePointer('move')
    else if (validPosition) changePointer('pointer')
    else changePointer('not-allowed');
  }

  handleClick(event) {
    /* Delegates a click action to Redux actions */
    let canvas = this.refs.konvaCanvas.getStage();
    let mousePos = this.getScaledPos();

    let validPosition = this.state.floorplanFX.ptInPolygon(mousePos);
    let intersecting = canvas.getIntersection(mousePos);

    if (validPosition && !intersecting) this.props.addFurnItem(mousePos);
    else if (validPosition && intersecting) {
      let intersectionId = intersecting.parent.getAttr('id');
      let focusedFurnId = this.props.focusedFurnId;

      return (focusedFurnId === intersectionId) ?
        this.props.removeFurnItem(getClickedShapeAttrs(event)) :
        this.props.updateFurnFocus(getClickedShapeAttrs(event));
    }
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

  handleZoom(event) {
    // Prevent default
    event.evt.preventDefault();

    // Gather variables
    const canvas = this.refs.konvaCanvas.getStage(),
          canvasAttrs = canvas.attrs,
          pointerPos = canvas.getPointerPosition();
    const xScaleOld = canvas.getScaleX(),
          yScaleOld = canvas.getScaleY();

    // Compute the new mouse position 
    const mousePointTo = {
      x: (pointerPos.x - canvasAttrs.x) / canvasAttrs.scaleX,
      y: (pointerPos.y - canvasAttrs.y) / canvasAttrs.scaleY
    };

    // Compute new scale, adjusting for (over) zooming out.
    var newScale = (event.evt.deltaY < 0) ? xScaleOld * 1.1 : xScaleOld / 1.1;
    newScale = (newScale < 1) ? 1 : newScale;

    // Compute the new (x, y) center from the translated zoom
    const newPosition = {
      x: -(mousePointTo.x - this.getScaledPos().x / newScale) * newScale,
      y: -(mousePointTo.y - this.getScaledPos().y / newScale) * newScale
    };

    // Set all of the attributes.
    this.setState({
      scaleX: newScale,
      scaleY: newScale,
      x: newPosition.x,
      y: newPosition.y
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
          floorplanFX={this.state.floorplanFX}
        />
      );
    });

    return (
      <div className="ms-Grid-row ms-borderBase">
        <Stage
          ref={"konvaCanvas"}
          // Dimensions
          width={this.state.width}
          height={this.state.height}
          x={this.state.x}
          y={this.state.y}
          scaleX={this.state.scaleX}
          scaleY={this.state.scaleY}
          // Change mouse on move, revert on leave
          onContentMouseMove={() => this.handleMouseAppearance()}
          onContentMouseOut={() => changePointer('default')}
          // Handle clicks and zooms
          onContentClick={(event) => this.handleClick(event)}
          onContentWheel={(event) => this.handleZoom(event)}
        > 
          <Floorplan
            width={this.state.width}
            height={this.state.height}
          />
          <Layer 
            ref={"furnitureLayer"}
            onDragMove={this.handleDragMove.bind(this)}
          >
            {konva_items}
          </Layer>
        </Stage>
      </div>
    );
  }
}