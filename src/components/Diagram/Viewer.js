import React          from 'react';
import PropTypes      from 'prop-types';
import {connect}      from 'react-redux';
import {updateEditor} from '../../actions/';
import GUI            from './GUI';


// React Component
class Viewer extends React.Component {
  static propTypes = {
    offsetXY     : PropTypes.arrayOf(PropTypes.number),
    scaleXY      : PropTypes.arrayOf(PropTypes.number),
    wh           : PropTypes.arrayOf(PropTypes.number),
    xy           : PropTypes.arrayOf(PropTypes.number),
    items        : PropTypes.arrayOf(PropTypes.object),
    updateEditor : PropTypes.func
  }

  static defaultProps = {
    offsetXY     : [0, 0],
    scaleXY      : [1, 1],
    wh           : [960, 500],
    xy           : [0, 0],
    items        : [],
    updateEditor : () => null
  }

  render() {
    return (
      <div className="ms-borderBase">
        <GUI 
          {...this.props}
          draggable={false}
          addEditorItem={() => null}
        />
      </div>
    );
  }
}


// Redux Container: take items from current *event* instead of form
const mapStateToProps = state => ({
  ...state.diagram.layout,
  items: state.events.current.items
})

const mapDispatchToProps = dispatch => ({
  updateEditor: (field, value) => dispatch(updateEditor(field, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);