// Dependencies
import React        from 'react';
import { Stage }    from 'react-konva';
import PropTypes    from 'prop-types';

// Components
import Floorplan  from './Floorplan';
import Furniture  from './Furniture';

// Utility functions
import EditorFunctions from '../utils/EditorFunctions';


// React (Konva) Component
export default class GUI extends React.Component {
  static propTypes = {
    width    : PropTypes.number,
    height   : PropTypes.number,
    x        : PropTypes.number,
    y        : PropTypes.number,
    scaleX   : PropTypes.number,
    scaleY   : PropTypes.number,
    items    : PropTypes.arrayOf(PropTypes.object),
    draggable: PropTypes.bool
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
  onContentWheel = event => {
    const updatedEditorConfig = EditorFunctions.handleZoomEvent(this.konvaCanvas, event);
    this.props.updateEditor(updatedEditorConfig);
  }

  /** Conditionally adds a furniture item to store. */
  onContentClick = event => {
    const { action, payload } = EditorFunctions.handleClickEvent(this.konvaCanvas, event);
    if (action === 'addItem')    this.props.addEditorItem(payload);
    if (action === 'selectItem') this.props.selectEditorItem(payload);
    if (action === 'removeItem') this.props.removeEditorItem(payload);
  }

  onDragEnd = event => {

    const {nodeType} = event.target;
    
    if (nodeType === 'Stage') {
      let xy = [event.target.attrs.x, event.target.attrs.y];
      this.props.updateEditor({ xy });
    }
  }

  render() {
    const {
      width, height, x, y, scaleX, scaleY, draggable
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
          this.props.updateEditor({ x: pos.x, y: pos.y})
          return pos;
        }}
        onDragEnd={this.onDragEnd}
        

        // Behavior
        onContentWheel={this.onContentWheel}
        onContentClick={this.onContentClick}
        onContextMenu={this.onContentClick}
      >
        <Floorplan
          width={width}
          height={height}
          scaleX={scaleX}
          scaleY={scaleY}
        />
        <Furniture
          items={this.props.items}
          draggable={draggable}
        />
      </Stage>
    );
  }
}