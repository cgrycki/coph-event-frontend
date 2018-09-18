import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Stage, Layer }     from 'react-konva';
import Floorplan            from './Floorplan';
import Furniture            from './Furniture';
import TransformerComponent from './TransformerComponent';
import {
  Toolbar,
  HUD,
  DownloadButton
} from './Surfaces';

import {
  addItemAndUpdateDiagram,
  removeItemAndUpdateDiagram,
  updateEditorItem,
  selectEditorItem,
  updateEditor,
  updateChairsAndCounts,
  resizeAndRescale,
  fetchLayouts
}                          from '../../actions';
import { EditorFunctions } from './utils';
// import CursorFunctions from './utils/CursorFunctions';
import ScaleFunctions from './utils/ScaleFunctions';
import './Diagram.css';



class Diagram extends Component {
  async componentDidMount() {
    const { fetchLayouts } = this.props;
    await fetchLayouts();
    // this.onResize();
  }

  konvaCanvas = React.createRef();

  onResize = () => {
    const { resizeAndRescale, items, width, height } = this.props;

    // Maximize canvas width W.R.T. aspect ratio
    const updatedDimensions = ScaleFunctions.resizeStageToContainer(this.konvaCanvas);
    
    // Rescale items according to new dimensions
    const updatedItems = ScaleFunctions.resizeItemCoordsToDimensions(items, {width, height}, updatedDimensions);
    
    // Notify our store of the updates
    return resizeAndRescale(updatedDimensions, updatedItems);
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
    const container = this.konvaCanvas.getStage().container();
    container.style.cursor = 'grab';
  }

  onDragEnd = event => {
    if (!this.konvaCanvas) return;
    const container = this.konvaCanvas.getStage().container();
    container.style.cursor = 'default';
    
    const { updateEditorLayout } = this.props;
    const updatedEditorConfig = EditorFunctions.handleDragEnd(event);
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
    const { x, y, width, height, scaleX, scaleY, draggable, items, selected_item } = this.props;

    const regularItems = items.filter(item => item.id !== selected_item);
    const selectedItem = items.filter(item => item.id === selected_item);

    return (
      <div className="Diagram--flex">
        {draggable &&
          <Toolbar
            furn_type={this.props.furn_type}
            chairs_per_table={this.props.chairs_per_table}
            counts={this.props.counts}
            updateChairsAndCounts={this.props.updateChairsAndCounts}
            updateEditorLayout={this.props.updateEditorLayout}
            pub_layouts={this.props.pub_layouts}
          />}
        <div id="Diagram--Container" className="Diagram--flex">
          <Stage
            ref={(ref) => { this.konvaCanvas = ref; }}
            width={width}
            height={height}
            x={x}
            y={y}
            scaleX={scaleX}
            scaleY={scaleY}
            
            draggable
            //onMouseDown={this.onEvents}
            //onMouseUp={this.onEvents}
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}

            onContentWheel={this.onContentWheel}
            onContentClick={this.onContentClick}
            onContentContextMenu={this.onContentClick}
          >
            <Floorplan width={width} height={height} />

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
              <HUD counts={this.props.counts} height={height} />
            </Layer>
          </Stage>
        </div>

        {this.konvaCanvas && <DownloadButton getStageURI={this.getStageURI.bind(this)} />}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  draggable: ownProps.draggable,
  items    : ownProps.items || state.diagram.items,
  counts   : ownProps.counts || state.diagram.counts,
  ...state.diagram.layout,
  pub_layouts    : state.diagram.pub_layouts,
  layouts_loading: state.diagram.layouts_loading,
  layouts_error  : state.diagram.layouts_error
})

const mapDispatchToProps = dispatch => ({
  selectEditorItem     : id                      => dispatch(selectEditorItem(id)),
  removeEditorItem     : id                      => dispatch(removeItemAndUpdateDiagram(id)),
  addEditorItem        : (x, y)                  => dispatch(addItemAndUpdateDiagram(x, y)),
  updateEditorItem     : ({id, furn, x, y, rot}) => dispatch(updateEditorItem({id, furn, x, y, rot})),
  updateEditorLayout   : (field, value)          => dispatch(updateEditor(field, value)),
  updateChairsAndCounts: chairs_per_table        => dispatch(updateChairsAndCounts(chairs_per_table)),
  resizeAndRescale     : (dimensions, items)     => dispatch(resizeAndRescale(dimensions, items)),
  fetchLayouts         : ()                      => dispatch(fetchLayouts())
})


export default connect(mapStateToProps, mapDispatchToProps)(Diagram);