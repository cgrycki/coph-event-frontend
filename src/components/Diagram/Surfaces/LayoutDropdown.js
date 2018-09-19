import React, { Component } from 'react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';


export default class LayoutDropdown extends Component {
  createDropdownOptions = () => {
    const { layouts } = this.props;
    const dropdownOptions = layouts.map(layout => ({
      key             : layout.id,
      text            : layout.id,
      itemType        : DropdownMenuItemType.Normal,
      items           : layout.items,
      chairs_per_table: layout.chairs_per_table
    }));

    return dropdownOptions;
  }

  render() {
    
    return (
      <Dropdown
        placeholder="Select to apply a layout"
        label="Default Layouts"
        ariaLabel="Layouts"
        options={this.createDropdownOptions()}
        onChanged={this.props.layoutCallback}
      />
    );
  }
}