// Dependencies
import React      from 'react';
import PropTypes  from 'prop-types';
import { connect }  from 'react-redux';
import {
  updateEditor,
  addEditorItem,
  selectEditorItem,
  removeEditorItem
}                 from '../../actions';
import GUI        from './GUI';
// import ZoomSlider from './Surfaces/ZoomSlider';
import Toolbar from './Surfaces/Toolbar';
//import NewToolbar from './Surfaces/NewToolbar';
import HUD from './Surfaces/HUD';
import './assets/Diagram.css';

const FLOOR_WIDTH = 1920;
const FLOOR_HEIGHT = 1500;


// React Component
class Editor extends React.Component {
  static propTypes = {
    width        : PropTypes.number,
    height       : PropTypes.number,
    x            : PropTypes.number,
    y            : PropTypes.number,
    scaleX       : PropTypes.number,
    scaleY       : PropTypes.number,
    items        : PropTypes.arrayOf(PropTypes.object),
    draggable    : PropTypes.bool,
    items        : PropTypes.arrayOf(PropTypes.object),
    updateEditor : PropTypes.func,
    addEditorItem: PropTypes.func
  }

  static defaultProps = {
    width: 960,
    height: 960,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    items        : [],
    updateEditor : () => null,
    addEditorItem: () => null
  }

  /** Resizes canvas and adds an event listener for a responsive diagram. */
  componentDidMount() {
    this.scaleContainer();
    window.addEventListener('resize', this.scaleContainer);

    // Set pixel ratio
    window.Konva.pixelRatio = 1;
  }

  /** Removes resize canvas listener */
  componentWillUnmount() {
    window.removeEventListener('resize', this.scaleContainer);
  }

  scaleContainer = () => {
    const { updateEditor, width } = this.props;

    // Get a handle on our container
    const canvasContainer = document.querySelector('.DiagramContainer');
    const containerBounds = canvasContainer.getBoundingClientRect();

    // Get the canvas height using the Floorplan's original dimension ratio.
    const containerWidth    = containerBounds.width;
    const constrainedHeight = (containerWidth * FLOOR_HEIGHT) / FLOOR_WIDTH;

    // Dispatch the new dimensions
    if (containerWidth !== width) {
      updateEditor({ width: containerWidth, height: constrainedHeight });
    }
  }

  render() {
    return (
      <div className="ms-borderBase DiagramContainer">
        <Toolbar />
        <GUI {...this.props} draggable={true} />
        <HUD />
      </div>
    );
  }
}


// Redux Container
const mapStateToProps = state => ({
  ...state.diagram.layout,
  items: state.diagram.items
});

const mapDispatchToProps = dispatch => ({
  updateEditor    : (field, value) => dispatch(updateEditor(field, value)),
  addEditorItem   : (x, y) => dispatch(addEditorItem(x, y)),
  selectEditorItem: id => dispatch(selectEditorItem(id)),
  removeEditorItem: id => dispatch(removeEditorItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
