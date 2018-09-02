// Dependencies
import React        from 'react';
import { connect }  from 'react-redux';
import { Stage }    from 'react-konva';
import PropTypes    from 'prop-types';

// Components
import Floorplan  from './Floorplan';

// Actions
import { updateEditor } from '../../../actions/editor.actions';

// Utility functions
import EditorFunctions from '../utils/EditorFunctions';



// React (Konva) Component
class GUI extends React.Component {
  static propTypes = {
    offsetXY: PropTypes.arrayOf(PropTypes.number),
    scaleXY : PropTypes.arrayOf(PropTypes.number),
    wh      : PropTypes.arrayOf(PropTypes.number),
    xy      : PropTypes.arrayOf(PropTypes.number)
  }

  konvaCanvas = React.createRef();

  onContentWheel = this.onContentWheel.bind(this);

  /**
   * Handles canvas mousewheel event, setting new scale and position.
   * @param {event} event Mouse wheel triggered event
   */
  onContentWheel(event) {
    const updatedEditorConfig = EditorFunctions.handleZoomEvent(this.konvaCanvas, event);
    this.props.updateEditor(updatedEditorConfig);
  }

  render() {
    const {
      scaleXY, wh, xy
    } = this.props;


    return (
      <Stage
        ref={(ref) => { this.konvaCanvas = ref; }}
        width={wh[0]}
        height={wh[1]}
        x={xy[0]}
        y={xy[1]}
        scaleX={scaleXY[0]}
        scaleY={scaleXY[1]}
        draggable
        onContentWheel={this.onContentWheel}
      >
        <Floorplan width={wh[0]} height={wh[1]} />
      </Stage>
    );
  }
}


// Redux Container
const mapStateToProps = state => ({
  ...state.editor.layout,

});

const mapDispatchToProps = dispatch => ({
  updateEditor: (field, value) => dispatch(updateEditor(field, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(GUI);