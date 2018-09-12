import React            from 'react';
import { connect }      from 'react-redux';
import { ChoiceGroup }  from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Toggle }       from 'office-ui-fabric-react/lib/Toggle';
import { updateEditor } from '../../../actions/diagram.actions';

class Toolbar extends React.Component {
  /** Parses clicked option and updates store with new furniture type */
  furnCallback = (event, option) => {
    const furn_type = option.key;
    const { updateEditor } = this.props;
    updateEditor({ furn_type });
  }


  chairCallback = event => {
    const { updateEditor } = this.props;
    const chairs_per_table = (event === true) ? 8 : 6;
    updateEditor({ chairs_per_table });
  }

  render() {
    const { chairs_per_table, furn_type } = this.props;

    return (
      <div className="ms-Grid-row Diagram--Toolbar">
        <div className="ms-Grid-col ms-sm4">
          <Toggle
            label="Chairs Per Table"
            offText="6"
            onText="8"
            checked={(chairs_per_table === 8)}
            onChanged={this.chairCallback}
          />
        </div>
        <div className="ms-Grid-col ms-sm8">
          <ChoiceGroup
            label="Furniture Type"
            selectedKey={furn_type}
            onChange={this.furnCallback}
            options={[
              {
                key: 'circle',
                text: 'Circular Table'
              },
              {
                key: 'chair',
                text: 'Chair'
              }
            ]}
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  chairs_per_table: state.diagram.layout.chairs_per_table,
  furn_type: state.diagram.layout.furn_type
});

const mapDispatchToProps = dispatch => ({
  updateEditor: payload => dispatch(updateEditor(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);