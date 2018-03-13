/*
 * Form Container
 * Connects to our Redux store, and renders our drag and drop editor.
 */
import React from 'react';
import { connect } from 'react-redux';

import GUI from '../components/editor/gui.component';
import Toolbar from '../components/editor/toolbar.component';
import HUD from '../components/editor/hud.component';

import { 
  updateSelectedFurnType, updateChairsPerTable,
  addFurnItem, updateFurnItem, removeFurnItem
} from '../actions';
import { canvasClickEvent, getClickedShapeAttrs } from '../utils';

class Editor extends React.Component {
  
  //componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <Toolbar
          selectedFurnType={this.props.selectedFurnType}
          updateSelectedFurnType={this.props.updateSelectedFurnType}
          chairsPerTable={this.props.chairsPerTable}
          updateChairsPerTable={this.props.updateChairsPerTable}
        />

        <HUD calculated={this.props.calculated}/>

        <GUI
          {...this.props.furn_items}
          selectedFurnType={this.props.selectedFurnType}
          addFurnItem={this.props.addFurnItem}
          updateFurnItem={this.props.updateFurnItem}
          removeFurnItem={this.props.removeFurnItem}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state.editorReducer};
}
const mapDispatchToProps = (dispatch) => {
  return {
    // Toolbar actions
    updateSelectedFurnType: (value) => dispatch(updateSelectedFurnType(value)),
    updateChairsPerTable:   (value) => dispatch(updateChairsPerTable(value)),
    
    // GUI actions
    addFurnItem:    (event) => dispatch(addFurnItem(canvasClickEvent(event))),
    updateFurnItem: (event) => dispatch(updateFurnItem(getClickedShapeAttrs(event))),
    removeFurnItem: (event) => dispatch(removeFurnItem(getClickedShapeAttrs(event)))
  };
}

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);
export default EditorContainer