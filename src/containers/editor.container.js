/*
 * Form Container
 * Connects to our Redux store, and renders our HTML input forms.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import editorReducer from '../reducers/editor.reducer';

class Editor extends React.Component {
  render() {
    return (
      <Stage width={500} height={500} />
    );
  }
}

const mapStateToProps = (state) => ({
    furn_ids: state.editorReducer.furn_ids,
    furn_items: state.editorReducer.furn_items,
    chairsPerTable: state.editorReducer.chairsPerTable,
    selectedFurnType: state.editorReducer.selectedFurnType,
    focusedFurnId: state.editorReducer.focusedFurnId
});
const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    
  };
}

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);
export default EditorContainer