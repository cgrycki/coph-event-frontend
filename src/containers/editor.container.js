/*
 * Form Container
 * Connects to our Redux store, and renders our drag and drop editor.
 */
import React from 'react';
import { connect } from 'react-redux';

import GUI from '../components/editor/gui.component';
import ToolbarContainer from '../containers/toolbar.container';
import HudContainer from '../containers/hud.container';

import { addFurnItem, updateFurnItem, removeFurnItem } from '../actions';
import { canvasClickEvent, getClickedShapeAttrs } from '../utils';

class Editor extends React.Component {
  
  //componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <ToolbarContainer/>
        <HudContainer/>

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
    // GUI actions
    addFurnItem:    (event) => dispatch(addFurnItem(canvasClickEvent(event))),
    updateFurnItem: (event) => dispatch(updateFurnItem(getClickedShapeAttrs(event))),
    removeFurnItem: (event) => dispatch(removeFurnItem(getClickedShapeAttrs(event)))
  };
}

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);
export default EditorContainer