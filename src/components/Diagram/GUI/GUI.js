// Dependencies
import React        from 'react';
import { connect }  from 'react-redux';
import { Stage }    from 'react-konva';
import PropTypes    from 'prop-types';

// Components
import Floorplan  from './Floorplan';
import Furniture  from './Furniture';

// Actions
import { 
  updateEditor,
  addEditorItem
} from '../../../actions/diagram.actions';

// Utility functions
import EditorFunctions from '../utils/EditorFunctions';



// React (Konva) Component
export default class GUI extends React.Component {
  static propTypes = {
    offsetXY : PropTypes.arrayOf(PropTypes.number),
    scaleXY  : PropTypes.arrayOf(PropTypes.number),
    wh       : PropTypes.arrayOf(PropTypes.number),
    xy       : PropTypes.arrayOf(PropTypes.number),
    items    : PropTypes.arrayOf(PropTypes.object),
    draggable: PropTypes.bool
  }

  static defaultProps = {
    offsetXY : [0, 0],
    scaleXY  : [1, 1],
    wh       : [960, 500],
    xy       : [0, 0],
    items    : [],
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
    const xy = EditorFunctions.handleClickEvent(this.konvaCanvas, event);
    if (xy) this.props.addEditorItem(xy);
  }



  render() {
    const { scaleXY, wh, xy, draggable } = this.props;

    return (
      <Stage
        // React HTML node reference
        ref={(ref) => { this.konvaCanvas = ref; }}

        // Dimensions and configuration
        width={wh[0]}
        height={wh[1]}
        x={xy[0]}
        y={xy[1]}
        scaleX={scaleXY[0]}
        scaleY={scaleXY[1]}

        // Stage panning
        draggable
        dragBoundFunc={pos => pos}
        

        // Behavior
        onContentWheel={this.onContentWheel}
        onContentClick={this.onContentClick}
        onContextMenu={this.onContentClick}
      >
        <Floorplan width={wh[0]} height={wh[1]} />
        <Furniture items={this.props.items} draggable={draggable} />
      </Stage>
    );
  }
}


// Redux Container
/*
const mapStateToProps = state => ({
  ...state.diagram.layout,
  items: state.diagram.items
});

const mapDispatchToProps = dispatch => ({
  updateEditor: (field, value) => dispatch(updateEditor(field, value)),
  addEditorItem: (x, y) => dispatch(addEditorItem(x, y))
});

export default connect(mapStateToProps, mapDispatchToProps)(GUI);
*/