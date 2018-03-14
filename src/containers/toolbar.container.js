import React from 'react';
import { connect, Dispatch } from 'react-redux';

import { initialState } from '../store/initialStore';
import Toolbar from '../components/editor/toolbar.component';
import { updateSelectedFurnType, updateChairsPerTable } from '../actions';

export const mapStateToProps = (state=initialState) => {
  return {
    selectedFurnType: state.editorReducer.selectedFurnType,
    chairsPerTable: state.editorReducer.chairsPerTable
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Toolbar actions
    updateSelectedFurnType: (value) => dispatch(updateSelectedFurnType(value)),
    updateChairsPerTable:   (value) => dispatch(updateChairsPerTable(value))
  };
};

const ToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(Toolbar);
export default ToolbarContainer;