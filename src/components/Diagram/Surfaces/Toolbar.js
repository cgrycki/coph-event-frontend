import React, { Component } from 'react';
import { Toggle }       from 'office-ui-fabric-react/lib/Toggle';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import inventory from '../../../constants/inventory';
import HelpModal from './HelpModal';


const furnChoices = [
  {key: 'circle', text: 'Circular Table'},
  {key: 'chair', text: 'Chair'},
  {key: 'rect', text: 'Rectangular Table'},
  {key: 'cocktail', text: 'High Top Table'},
  {key: 'display', text: 'Display Board'},
  {key: 'trash', text: 'Trash Can'}
];


export default class Toolbar extends Component {
  state = { helpOpen: false };

  createFurnMenu = () => {
    const { counts, furn_type, updateEditorLayout } = this.props;
    const furnSubMenu = furnChoices.map(furn => {
      furn.canCheck = true;
      furn.checked = furn.key === furn_type;
      furn.disabled = counts[furn.key] >= inventory[furn.key];
      furn.onClick = () => updateEditorLayout({ furn_type: furn.key })
      return furn;
    });

    const furnM = {
      key: 'addItem',
      name: 'Add',
      iconProps: { iconName: 'Add' },
      subMenuProps: { items: furnSubMenu }
    };

    return furnM;
  }
  createLayoutMenu = () => {
    const { pub_layouts, populateEditor } = this.props;
    const layoutSubmenu = pub_layouts.map(d => {
      return {
        key: d.id,
        name: d.id,
        onClick: () => populateEditor(d.items, d.chairs_per_table)
      };
    });

    const layoutM = {
      key: 'layoutM',
      name: 'Apply Layout',
      iconProps: { iconName: 'Design'},
      subMenuProps: {
        items: layoutSubmenu
      }
    };

    return layoutM;
  }
  createChairToggle = () => {
    const { chairs_per_table } = this.props;

    const chairBtn = {
      key: 'chairBtn',
      name: 'Chairs Per Table',
      onRender: () => {
        return (
          <div className="Diagram--Toolbar--ChairToggle">
            <span>Chairs Per Table</span>
            <Toggle
              offText="6"
              offAriaLabel="6 Chairs"
              onText="8"
              onAriaLabel="8 Chairs"
              checked={(chairs_per_table === 8)}
              onChanged={this.chairCallback}
            />
          </div>
        );
      }
    };
    return chairBtn;
  }
  createDownBtn = () => {
    const downB = {
      key: 'downB', name: 'Download', iconProps: { iconName: 'CloudDownload'},
      onClick: this.downloadCallback
    };
    return downB;
  }
  createHelpBtn = () => {
    const helpBtn = {
      key: 'helpBtn',
      name: 'Help',
      iconProps: { iconName: 'Info' },
      onClick: this.helpCallback
    };
    return helpBtn;
  }

  chairCallback = event => {
    const { updateChairsAndCounts } = this.props;
    const chairs_per_table = (event === true) ? 8 : 6;
    return updateChairsAndCounts(chairs_per_table);
  }
  downloadCallback = () => {
    const { getStageURI } = this.props;
    // Get stage PNG as Base64
    const uri = getStageURI();

    // Create download object
    const link = document.createElement('a');
    link.download = 'CPHB Event Floorplan';
    link.href = uri;

    // Attach to body and simulate click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  helpCallback = () => { this.setState({ helpOpen: !this.state.helpOpen }); }

  render() {
    const { width } = this.props;

    return (
      <React.Fragment>
        <CommandBar
          style={{ width: width }}
          overflowButtonProps={{ iconProps: { iconName: 'WaffleOffice365'}}}
          items={[
            this.createFurnMenu(),
            this.createLayoutMenu(),
            this.createChairToggle()
          ]}
          farItems={[
            this.createDownBtn(),
            this.createHelpBtn()
          ]}
        />
        <HelpModal helpOpen={this.state.helpOpen} onDismiss={this.helpCallback} />
      </React.Fragment>
    );
  }
}