import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { Group, Circle }        from 'react-konva';
import { updateEditorItem }     from '../../../actions/diagram.actions';
import { FurnitureFunctions }   from '../utils';
import {
  CloseButton,
  Table6Chairs,
  Table8Chairs,
  RectTable,
  CocktailTable,
  Chair,
  DisplayBoard,
  TrashCan
} from './Items';



class Furniture extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.item !== nextProps.item) || 
      (this.props.chairs_per_table !== nextProps.chairs_per_table)
    );
  }

  getDragStatus = () => {
    const { item: { id }, selected_item, draggable } = this.props;
    return ((id === selected_item) && (draggable === true));
  }

  onDragStart = event => {
    if (!this.konvaNode) return;
    else FurnitureFunctions.handleDragStart(this.konvaNode, event);
  }

  onDragMove = event => {
    if (!this.konvaNode) return;
    else {
      const { updateEditorItem } = this.props;
      const draggedNode = FurnitureFunctions.handleDragMove(this.konvaNode, event);
      return updateEditorItem(draggedNode);
    };
  }

  async onDragEnd(event) {
    if (!this.konvaNode) return;
    else {
      const { updateEditorItem } = this.props;
      const itemAttrs = await FurnitureFunctions.handleDragEnd(this.konvaNode, event);
      return updateEditorItem(itemAttrs);
    }
  }

  onTransformStart = event => {
    if (!this.konvaNode) return;
    else FurnitureFunctions.handleTransformStart(this.konvaNode, event);
  }

  onTransformEvent = event => {
    if (!this.konvaNode) return;
    else {
      const { updateEditorItem } = this.props;
      const transformedNode = FurnitureFunctions.handleTransformRotate(this.konvaNode, event);
      return updateEditorItem(transformedNode);
    }
  }

  async onTransformEnd(event) {
    if (!this.konvaNode) return;
    else {
      const { updateEditorItem } = this.props;
      const itemAttrs = await FurnitureFunctions.handleTransformEnd(this.konvaNode, event);
      return updateEditorItem(itemAttrs);
    }
  }

  onMouseOver = event => {
    if (!this.konvaNode) return;
    FurnitureFunctions.handleMouseOver(this.konvaNode, this.getDragStatus(), event);
  }

  renderDeleteButton  = furnType => CloseButton(furnType);

  renderFurnitureItem = () => {
    const { item: { id, furn }, chairs_per_table, selected_item } = this.props;
    const circleTable = (chairs_per_table === 6) ? Table6Chairs : Table8Chairs;

    switch (furn) {
      case 'circle'  : return circleTable(id, selected_item);
      case 'rect'    : return RectTable(id, selected_item);
      case 'cocktail': return CocktailTable(id, selected_item);
      case 'chair'   : return Chair(id, selected_item);
      case 'display' : return DisplayBoard(id, selected_item);
      case 'trash'   : return TrashCan(id, selected_item);
      default        : return;
    }
  }

  render() {
    const { selected_item }       = this.props;
    const { id, furn, x, y, rot } = this.props.item;
    const collision = (this.konvaNode) ? this.konvaNode.getAttr('collision'):false;
    const selected  = selected_item === id;

    return (
      <Group
        ref={(ref) => { this.konvaNode = ref; }}
        
        x={x}
        y={y}
        rotation={rot}
        name={furn}
        id={id}

        // Dragging
        draggable={this.getDragStatus()}
        onDragStart={this.onDragStart}
        onTouchStart={this.onDragStart}
        onDragMove={this.onDragMove}
        onTouchMove={this.onDragMove}
        onDragEnd={this.onDragEnd.bind(this)}
        onTouchEnd={this.onDragEnd.bind(this)}
        
        // Rotating
        onTransformStart={this.onTransformStart}
        onTransform={this.onTransformEvent}
        onTransformEnd={this.onTransformEnd.bind(this)}

        onMouseOver={this.onMouseOver}
      >
        <Group name="furnItemWrapper">{this.renderFurnitureItem()}</Group>
        {selected && this.renderDeleteButton(furn)}
        <Circle
          name="boundsHint"
          radius={15}
          fillEnabled={false}
          listening={false}
          stroke={collision ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)'}
        />
      </Group>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  item            : ownProps.item,
  draggable       : ownProps.draggable,
  chairs_per_table: state.diagram.layout.chairs_per_table,
  selected_item   : state.diagram.layout.selected_item
})

const mapDispatchToProps = dispatch => ({
  updateEditorItem: ({ id, furn, x, y, rot }) => dispatch(updateEditorItem({id, furn, x, y, rot }))
})


export default connect(mapStateToProps, mapDispatchToProps)(Furniture);
