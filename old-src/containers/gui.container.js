import { connect } from 'react-redux';
import GUI from '../components/editor/gui.component';
import { addFurnItem, removeFurnItem, updateFurnFocus } from '../actions';

export const mapStateToProps = (state) => {
  return {
    selectedFurnType: state.editorReducer.selectedFurnType,
    chairsPerTable: state.editorReducer.chairsPerTable,
    focusedFurnId: state.editorReducer.focusedFurnId,
    furn_items: state.editorReducer.furn_items
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addFurnItem:    (value) => dispatch(addFurnItem(value)),
    removeFurnItem: (value) => dispatch(removeFurnItem(value)),
    updateFurnFocus:(value) => dispatch(updateFurnFocus(value))
  };
}

const GuiContainer = connect(mapStateToProps, mapDispatchToProps)(GUI);
export default GuiContainer;