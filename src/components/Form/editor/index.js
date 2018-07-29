// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';


// Component
class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ms-borderBase">
        <Stage width={500} height={400} />
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  ...state.editor
});

export default connect(mapStateToProps)(EditorComponent);
