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

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  //componentWillReceiveProps(nextProps) {}

  render() {
    console.log(this);
    return (
      <div>
        <Toolbar
          updateSelectedFurnType={this.props.updateSelectedFurnType}
          updateChairsPerTable={this.props.updateChairsPerTable}
          selectedFurnType={this.props.selectedFurnType}
        />
        <HUD calculated={this.props.calculated}/>
        <GUI/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state.editorReducer};
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedFurnType: (event) => dispatch(updateSelectedFurnType(event.target.value)),
    updateChairsPerTable: (event) => dispatch(updateChairsPerTable(event.target.value))
  };
}

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);
export default EditorContainer