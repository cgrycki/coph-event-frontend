// Dependencies
import React      from 'react';
import PropTypes  from 'prop-types';
import {connect}  from 'react-redux';
import {
  updateEditor,
  addEditorItem
}                 from '../../actions/';
import GUI        from './GUI';
import ZoomSlider from './Surfaces/ZoomSlider';
import './assets/Diagram.css';


// React Component
class Editor extends React.Component {
  static propTypes = {
    offsetXY     : PropTypes.arrayOf(PropTypes.number),
    scaleXY      : PropTypes.arrayOf(PropTypes.number),
    wh           : PropTypes.arrayOf(PropTypes.number),
    xy           : PropTypes.arrayOf(PropTypes.number),
    items        : PropTypes.arrayOf(PropTypes.object),
    updateEditor : PropTypes.func,
    addEditorItem: PropTypes.func
  }

  static defaultProps = {
    offsetXY     : [0, 0],
    scaleXY      : [1, 1],
    wh           : [960, 500],
    xy           : [0, 0],
    items        : [],
    updateEditor : () => null,
    addEditorItem: () => null
  }

  render() {
    return (
      <div className="ms-borderBase DiagramContainer">
        <GUI {...this.props} draggable={true} />
      </div>
    );
  }
}


// Redux Container
const mapStateToProps = state => ({
  ...state.diagram.layout,
  items: state.diagram.items
})

const mapDispatchToProps = dispatch => ({
  updateEditor: (field, value) => dispatch(updateEditor(field, value)),
  addEditorItem: (x, y) => dispatch(addEditorItem(x, y))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);