import { connect } from 'react-redux';
import GUI from '../components/editor/gui.component';
import { addFurnItem, updateFurnItem, removeFurnItem, updateFurnFocus } from '../actions';
import { canvasClickEvent, getClickedShapeAttrs } from '../utils';

export const mapStateToProps = (state) => {
  return {
    selectedFurnType: state.editorReducer.selectedFurnType,
    chairsPerTable: state.editorReducer.chairsPerTable,
    focusedFurnId: state.editorReducer.focusedFurnId,
    furn_ids: state.editorReducer.furn_ids,
    ...state.editorReducer.furn_items
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addFurnItem:    (event) => dispatch(addFurnItem(canvasClickEvent(event))),
    updateFurnItem: (event) => dispatch(updateFurnItem(getClickedShapeAttrs(event))),
    removeFurnItem: (event) => dispatch(removeFurnItem(getClickedShapeAttrs(event))),
    updateFurnFocus:(event) => dispatch(updateFurnFocus(getClickedShapeAttrs(event)))
  };
}

const GuiContainer = connect(mapStateToProps, mapDispatchToProps)(GUI);
export default GuiContainer;