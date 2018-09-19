import React            from 'react';
import { ChoiceGroup }  from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Toggle }       from 'office-ui-fabric-react/lib/Toggle';
import LayoutDropdown   from './LayoutDropdown';
import inventory        from '../../../constants/inventory';


export default class Toolbar extends React.Component {
  /** Creates radio buttons, disabling if inventory is cached. */
  createFurnitureChoices = () => {
    const { counts } = this.props;

    const furnChoices = [
      {key: 'circle', text: 'Circular Table'},
      {key: 'chair', text: 'Chair'},
      {key: 'rect', text: 'Rectangular Table'},
      {key: 'cocktail', text: 'Bar Top Table'},
      {key: 'display', text: 'Display Board'},
      {key: 'trash', text: 'Trash Can'}
    ];

    return furnChoices.map(furn => {
      furn.disabled = counts[furn.key] >= inventory[furn.key];
      return furn;
    });
  }

  /** Parses clicked option and updates store with new furniture type */
  furnCallback = (event, option) => {
    const furn_type = option.key;
    const { updateEditorLayout } = this.props;
    updateEditorLayout({ furn_type });
  }

  /** Parses toggle click and updates store with new chairs per table attribute. */
  chairCallback = event => {
    const { updateChairsAndCounts } = this.props;
    const chairs_per_table = (event === true) ? 8 : 6;
    updateChairsAndCounts(chairs_per_table);
  }

  /** Parses dropdown event and populates diagram with layout items */
  layoutCallback = event => {
    const { populateEditor } = this.props;
    const { items, chairs_per_table } = event;
    populateEditor(items, chairs_per_table);
  }

  render() {
    const { chairs_per_table, furn_type, pub_layouts } = this.props;

    return (
      <div className="ms-Grid-row Diagram--Toolbar">
        <div className="ms-Grid-col ms-sm2">
          <Toggle
            label="Chairs Per Table"
            offText="6"
            onText="8"
            checked={(chairs_per_table === 8)}
            onChanged={this.chairCallback}
          />
        </div>
        <div className="ms-Grid-col ms-sm3">
          <LayoutDropdown
            layouts={pub_layouts}
            layoutCallback={this.layoutCallback}
          />
        </div>
        <div className="ms-Grid-col ms-sm7">
          <ChoiceGroup
            className="Diagram--FurnitureSelector"
            label="Furniture Type"
            selectedKey={furn_type}
            onChange={this.furnCallback}
            options={this.createFurnitureChoices()}
          />
        </div>
      </div>
    );
  }
}