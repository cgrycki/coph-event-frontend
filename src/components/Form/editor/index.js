// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';


// Component
class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getCanvasSize() {
    /* Returns the appropriate canvas size dimensions. */
    const window_width = window.innerWidth;
    const canvas_width = window_width * 0.9;

    const window_height = window.innerHeight;
    const canvas_height = (window_height * 0.9) - 35;
    
    return { canvas_width, canvas_height };
  }

  render() {
    let { canvas_width, canvas_height } = this.getCanvasSize();

    return (
      <div className="ms-borderBase">
        <Stage width={500} height={500} />
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  ...state.editor
});

export default connect(mapStateToProps)(EditorComponent);
