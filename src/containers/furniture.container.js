import { connect } from 'react-redux';
import { Furniture } from '../components';
import { updateFurnItem, removeFurnItem } from '../actions';

export const mapStateToProps = (state) => {
  return {
    chairsPerTable: state.editorReducer.chairsPerTable,
    focusedFurnId: state.editorReducer.focusedFurnId
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    removeFurnItem: (value) => dispatch(removeFurnItem(value)),
    updateFurnItem:(value) => dispatch(updateFurnItem(value))
  };
}

const FurnitureContainer = connect(mapStateToProps, mapDispatchToProps)(Furniture);
export default FurnitureContainer;