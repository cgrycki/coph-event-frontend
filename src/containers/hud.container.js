import { connect } from 'react-redux';
import { initialState } from '../store/initialStore';
import HUD from '../components/editor/hud.component';

export function mapStateToProps(state=initialState) {
  return {...state.editorReducer.calculated};
}

const HudContainer = connect(mapStateToProps)(HUD);
export default HudContainer;