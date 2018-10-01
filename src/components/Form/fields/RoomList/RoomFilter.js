import React, { Component } from 'react';
import { Checkbox }         from 'office-ui-fabric-react/lib/Checkbox';
import { IconButton }       from 'office-ui-fabric-react/lib/Button';
import LabelRender          from '../../../common/LabelRender';
import features             from './features';


export default class RoomFilter extends Component {
  state = { collapsed: true }

  createCheckbox = feature => {
    const { checkedFeatures, onCheck } = this.props;
    const checked = checkedFeatures.has(feature);
    
    return (
      <Checkbox
        key={`filterFeature--${feature}`}
        label={feature}
        checked={checked}
        onChange={(evt, val) => onCheck(evt, feature)}
        className="ms-fadeIn200 RoomList--Checkbox"
      />
    );
  }

  createCheckboxes = () => {}

  createLabel = () => {
    const iconClass = (this.state.collapsed) ? '' : 'FilterIcon--Open';
    const label     = 'Filter by Room Features';
    const info      = 'Select one or more features to filter rooms with selection.';
    const reqd      = false;

    return (
      <span>
        <IconButton
          iconProps={{ iconName: 'TriangleSolidRight12' }}
          className={`FilterIcon ${iconClass}`}
          onClick={this.toggleCollapse}
        />
        <LabelRender label={label} info={info} required={reqd} />
      </span>
    );
  }

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { collapsed } = this.state;

    return (
      <div className="RoomList--FeatureFilterWrapper">
        {this.createLabel()}
        <div className="ms-fadeIn200 RoomList--FeatureFilter">
          {!collapsed && features.map(this.createCheckbox)}
        </div>
      </div>
    );
  }
}