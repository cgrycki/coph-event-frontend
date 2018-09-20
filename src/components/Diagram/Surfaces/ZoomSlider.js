// Dependecies
import React        from 'react';
import { connect }  from 'react-redux';
import { Slider }   from 'office-ui-fabric-react/lib/Slider';

// Actions
import { updateEditor } from '../../../actions/diagram.actions';


// React Component
class ZoomSlider extends React.Component {
  state = { zoom: 1 };

  onChange = function(value) {
    const newScale = { scaleXY: [value, value] };
    this.props.updateEditor(newScale);
  }.bind(this);

  render() {
    return (
      <div id="ZoomSliderDiv">
        <div className="ms-verticalBox">
          <Slider
            id="ZoomSlider"
            min={1}
            max={8}
            step={1}
            label="Zoom"
            vertical={true}
            value={Math.round(this.props.scaleXY[0])}
            onChange={this.onChange}
            styles={{ root: { height: '150px' }}}
          />
        </div>
      </div>
    );
  }
}


// Redux Container
const mapStateToProps = state => ({
  xy     : state.diagram.layout.xy,
  scaleXY: state.diagram.layout.scaleXY
});

const mapDispatchToProps = dispatch => ({
  updateEditor: fields => dispatch(updateEditor(fields))
});

export default connect(mapStateToProps, mapDispatchToProps)(ZoomSlider);