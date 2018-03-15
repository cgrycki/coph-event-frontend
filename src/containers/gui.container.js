import { connect } from 'react-redux';
import GUI from '../components/editor/gui.component';
import { addFurnItem, updateFurnItem, removeFurnItem, updateFurnFocus } from '../actions';
import { canvasClickPos, getClickedShapeAttrs } from '../utils';

export const mapStateToProps = (state) => {
  return {
    selectedFurnType: state.editorReducer.selectedFurnType,
    chairsPerTable: state.editorReducer.chairsPerTable,
    focusedFurnId: state.editorReducer.focusedFurnId,
    furn_ids: state.editorReducer.furn_ids,
    furn_items: state.editorReducer.furn_items
  };
}
/*
export const mapDispatchToProps = (dispatch) => {
  return {
    addFurnItem:    (event) => dispatch(addFurnItem(canvasClickPos(event))),
    updateFurnItem: (event) => dispatch(updateFurnItem(getClickedShapeAttrs(event))),
    removeFurnItem: (event) => dispatch(removeFurnItem(getClickedShapeAttrs(event))),
    updateFurnFocus:(event) => dispatch(updateFurnFocus(getClickedShapeAttrs(event)))
  };
}
*/
export const mapDispatchToProps = (dispatch) => {
  return {
    addFurnItem:    (value) => dispatch(addFurnItem(value)),
    updateFurnItem: (value) => dispatch(updateFurnItem(value)),
    removeFurnItem: (value) => dispatch(removeFurnItem(value)),
    updateFurnFocus:(value) => dispatch(updateFurnFocus(value))
  };
}

const GuiContainer = connect(mapStateToProps, mapDispatchToProps)(GUI);
export default GuiContainer;