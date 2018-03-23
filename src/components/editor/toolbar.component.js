import React from 'react';
import { ChoiceGroup, Toggle } from 'office-ui-fabric-react';

import { funitureTypes, furnitureTypes } from '../../constants';

export class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFurnType: props.selectedFurnType,
      chairsPerTable: props.chairsPerTable
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedFurnType: nextProps.selectedFurnType,
      chairsPerTable: nextProps.chairsPerTable
    });
  }

  renderFurniture() {
    let updateSelectedFurnType = this.props.updateSelectedFurnType;
    let furnitureBtns = furnitureTypes.map(choice => {
      return {
        key: choice.value,
        text: choice.label
      };
    });

    return (
      <ChoiceGroup
        label={"Furniture Type"}
        options={furnitureBtns}
        selectedKey={this.state.selectedFurnType}
        onChange={(evt, opt) => updateSelectedFurnType(opt.key)}
      />
    );
  }

  renderChairs() {
    let updateChairsPerTable = this.props.updateChairsPerTable;
    /*
    return (
      <ChoiceGroup
        label={"Chairs Per Table"}
        options={[{ key: 6, text: '6'}, { key: 8, text: '8'}]}
        selectedKey={this.state.chairsPerTable}
        onChange={(evt, opt) => updateChairsPerTable(opt.key)}
      />
    );
    */
   return (
     <Toggle
      label={"Chairs Per Table"}
      checked={this.state.chairsPerTable === 8}
      onText={'8'}
      offText={'6'}
      onChanged={(evt) => (evt === false) ? 
        updateChairsPerTable(6) :
        updateChairsPerTable(8)
      }
     />
   );
  }

  render() {
    return (
      <div className="ms-Grid-row Toolbar">
        <div className="ms-Grid-col ms-xs12 ms-sm9 ms-xl8 ms-xxl6">
          {this.state.selectedFurnType && this.renderFurniture()}
        </div>
        <div className="ms-Grid-col ms-xs12 ms-sm3 ms-xl4 ms-xxl6">
          {this.state.chairsPerTable && this.renderChairs()}
        </div>
      </div>
    );
  }
}

export default Toolbar