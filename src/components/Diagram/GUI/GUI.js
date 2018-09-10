// Dependencies
import React        from 'react';
import { Stage }    from 'react-konva';
import PropTypes    from 'prop-types';

// Components
import ExteriorWalls  from './Floorplan/ExteriorWalls';
import FloorGood      from './Floorplan/FloorGood';
import ClassAndCafe   from './Floorplan/ClassAndCafe';
import Furniture      from './Furniture';

// Utility functions
import EditorFunctions from '../utils/EditorFunctions';


// React (Konva) Component
export default class GUI extends React.Component {
  static propTypes = {
    width           : PropTypes.number,
    height          : PropTypes.number,
    x               : PropTypes.number,
    y               : PropTypes.number,
    scaleX          : PropTypes.number,
    scaleY          : PropTypes.number,
    items           : PropTypes.arrayOf(PropTypes.object),
    draggable       : PropTypes.bool,
    addEditorItem   : PropTypes.func,
    selectEditorItem: PropTypes.func,
    removeEditorItem: PropTypes.func,
    updateEditor    : PropTypes.func
  }

  static defaultProps = {
    width: 960,
    height: 960,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    items        : [],
    draggable: true
  }

  // Canvas Reference
  konvaCanvas = React.createRef();

  /**
   * Handles canvas mousewheel event, setting new scale and position.
   * @param {event} event Mouse wheel triggered event
   */
  onContentWheel = (event) => {
    const { updateEditor } = this.props;
    const updatedEditorConfig = EditorFunctions.handleZoomEvent(this.konvaCanvas, event);
    updateEditor(updatedEditorConfig);
  }

  /** Dispatches the appropriate action, if any, to store in response to a canvas click. */
  onContentClick = (event) => {
    const { addEditorItem, selectEditorItem, removeEditorItem } = this.props;
    const { action, payload } = EditorFunctions.handleClickEvent(this.konvaCanvas, event);

    if (action === null)         return;
    if (action === 'addItem')    addEditorItem(payload);
    if (action === 'selectItem') selectEditorItem(payload);
    if (action === 'removeItem') removeEditorItem(payload);
  }

  /** Listener that dispatches an editor config update. */
  onDragEnd = (event) => {
    const { updateEditor } = this.props;
    const updatedEditorConfig = EditorFunctions.handleDragEnd(event);
    if (updatedEditorConfig) updateEditor(updatedEditorConfig);
  }

  render() {
    const {
      width, height, x, y, scaleX, scaleY, draggable, items, updateEditor
    } = this.props;

    return (
      <Stage
        // React HTML node reference
        ref={(ref) => { this.konvaCanvas = ref; }}

        // Dimensions and configuration
        width={width}
        height={height}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}

        // Stage panning
        draggable
        dragBoundFunc={(pos) => {
          updateEditor({ x: pos.x, y: pos.y});
          return pos;
        }}
        onDragEnd={this.onDragEnd}

        // Interaction behavior
        onContentWheel={this.onContentWheel}
        onContentClick={this.onContentClick}
        onContextMenu={this.onContentClick}
      >
        <FloorGood
          width={width}
          height={height}
          scaleX={scaleX}
          scaleY={scaleY}
        />
        <ClassAndCafe
          width={width}
          height={height}
          scaleX={scaleX}
          scaleY={scaleY}
        />
        <ExteriorWalls
          width={width}
          height={height}
          scaleX={scaleX}
          scaleY={scaleY}
        />
        <Furniture
          items={items}
          draggable={draggable}
        />
      </Stage>
    );
  }
}
