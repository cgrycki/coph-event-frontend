import React from 'react';
import { connect} from 'react-redux';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { updateEditor } from '../../../actions/diagram.actions';

class Toolbar extends React.Component {
  render() {
    return (
      <div className="ms-Grid-row Diagram--Toolbar">
        <div className="ms-Grid-col ms-sm12">

        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  chairs_per_table: state.diagram.counts.chairs_per_table,
  furn_type: state.diagram.layout.furn_type
});

const mapDispatchToProps = dispatch => ({
  updateEditor: payload => dispatch(updateEditor(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);