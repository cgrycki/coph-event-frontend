import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Stage, Layer }     from 'react-konva';
import Floorplan            from './Floorplan';
import Furniture            from './Furniture';
import Labels               from './Floorplan/Labels';
import TransformerComponent from './TransformerComponent';
import {
  Toolbar,
  HUD,
  Background
}                           from './Surfaces';
import {
  addItemAndUpdateDiagram,
  removeItemAndUpdateDiagram,
  updateEditorItem,
  selectEditorItem,
  updateEditor,
  updateChairsAndCounts,
  fetchLayouts,
  populateEditor
}                           from '../../actions';
import {
  EditorFunctions,
  ScaleFunctions
}                           from './utils';
import './Diagram.css';



class Diagram extends Component {
  async componentDidMount() {
    const { cphit, pub_layouts, layouts_loading, fetchLayouts } = this.props;
    if (pub_layouts.length === 0 && !layouts_loading && cphit === undefined) await fetchLayouts();
    this.onResize();
  }

  konvaCanvas = React.createRef();

  onResize = () => {
    if (!this.konvaCanvas) return;
    const { updateEditorLayout } = this.props;

    // Maximize canvas width W.R.T. aspect ratio
    const updatedDimensions = ScaleFunctions.resizeStageToContainer(this.konvaCanvas);
    
    // Notify our store of the updates
    return updateEditorLayout(updatedDimensions);
  }

  onContentWheel = event => {
    const { updateEditorLayout } = this.props;
    const updatedLayout = EditorFunctions.handleZoomEvent(this.konvaCanvas, event);
    updateEditorLayout(updatedLayout);
  }

  onContentClick = event => {
    if (!this.konvaCanvas || !this.props.draggable) return;
    const { addEditorItem, selectEditorItem, removeEditorItem, furn_type } = this.props;
    const { action, payload } = EditorFunctions.handleClickEvent(this.konvaCanvas, event, furn_type);

    // Dispatch the correct action
    if (action === 'selectItem')      selectEditorItem(payload);
    else if (action === 'removeItem') removeEditorItem(payload);
    else if (action === 'addItem')    addEditorItem(payload);
    else return;
  }

  onDragStart = event => {
    if (!this.konvaCanvas) return;
    EditorFunctions.handleDragStart(this.konvaCanvas, event);
  }

  onDragEnd = event => {
    if (!this.konvaCanvas) return;
    
    const { updateEditorLayout } = this.props;
    const updatedEditorConfig = EditorFunctions.handleDragEnd(this.konvaCanvas, event);
    if (updatedEditorConfig) updateEditorLayout(updatedEditorConfig);
  
  }

  getStageURI = () => {
    if (!this.konvaCanvas) return '';
    const stage = this.konvaCanvas.getStage();
    const { scaleX, scaleY, x, y } = this.props;

    // Maximize canvas for readibility
    stage.position({ x: 0, y: 0 });
    stage.scale({ x: 1, y: 1});
    stage.batchDraw();

    // Save the layout as a PNG
    const dataURI = stage.toDataURL();

    // Revert settings
    stage.scale({ x: scaleX, y: scaleY });
    stage.position({ x, y });
    stage.batchDraw();

    return dataURI;
  }

  render() {
    const {
      x, y, width, height, scaleX, scaleY, items, selected_item,
      draggable, cphit
    } = this.props;

    const regularItems = items.filter(item => item.id !== selected_item);
    const selectedItem = items.filter(item => item.id === selected_item);

    return (
      <div className="Diagram--flex">
        <Toolbar
          width={width}
          draggable={draggable}
          furn_type={this.props.furn_type}
          chairs_per_table={this.props.chairs_per_table}
          counts={this.props.counts}
          updateChairsAndCounts={this.props.updateChairsAndCounts}
          updateEditorLayout={this.props.updateEditorLayout}
          pub_layouts={this.props.pub_layouts}
          populateEditor={this.props.populateEditor}
          getStageURI={this.getStageURI.bind(this)}
        />
        <div id="Diagram--Container" className="Diagram--flex">
          <Stage
            ref={(ref) => { this.konvaCanvas = ref; }}
            width={width}
            height={height}
            x={x}
            y={y}
            scaleX={scaleX}
            scaleY={scaleY}
            
            // Dragging
            draggable
            onDragStart={this.onDragStart}
            //onContentTouchStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            //onContentTouchEnd={this.onDragEnd}
            
            // Zooming
            onContentWheel={this.onContentWheel}
            onContentClick={this.onContentClick}

            // Clicking
            onContentContextMenu={this.onContentClick}
            //onContentTap={this.onContentClick}
          >
            <Background width={width} height={height} />
            <Floorplan  width={width} height={height} />
            <Labels     width={width} height={height} items={items} />

            <Layer name='itemLayer'>
              {regularItems.map(item => <Furniture item={item} key={item.id} draggable={draggable} />)}
            </Layer>

            <Layer name='dragLayer'>
              {selectedItem.map(item => <Furniture item={item} key={item.id} draggable={draggable} />)}
              <TransformerComponent
                selected_item={this.props.selected_item}
                updateEditorItem={this.props.updateEditorItem}
              />
            </Layer>

            <Layer name='hudLayer'>
              <HUD
                cphit={cphit}
                counts={this.props.counts}
                x={x}
                y={y}
                scaleX={scaleX}
                scaleY={scaleY}
                width={width}
                height={height}
              />
            </Layer>
          </Stage>
        </div>
        
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  draggable: ownProps.draggable,
  cphit    : ownProps.cphit,
  items    : ownProps.items || state.diagram.items,
  counts   : ownProps.counts || state.diagram.counts,
  ...state.diagram.layout,
  pub_layouts    : state.diagram.pub_layouts,
  layouts_loading: state.diagram.layouts_loading,
  layouts_error  : state.diagram.layouts_error
})

const mapDispatchToProps = dispatch => ({
  selectEditorItem     : id                         => dispatch(selectEditorItem(id)),
  removeEditorItem     : id                         => dispatch(removeItemAndUpdateDiagram(id)),
  addEditorItem        : (x, y)                     => dispatch(addItemAndUpdateDiagram(x, y)),
  updateEditorItem     : ({id, furn, x, y, rot})    => dispatch(updateEditorItem({id, furn, x, y, rot})),
  updateEditorLayout   : (field, value)             => dispatch(updateEditor(field, value)),
  updateChairsAndCounts: chairs_per_table           => dispatch(updateChairsAndCounts(chairs_per_table)),
  fetchLayouts         : ()                         => dispatch(fetchLayouts()),
  populateEditor       : (items, chairs_per_table)  => dispatch(populateEditor({ items, chairs_per_table }))
})


export default connect(mapStateToProps, mapDispatchToProps)(Diagram);