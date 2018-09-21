import React, { Component } from 'react';
import { Checkbox }         from 'office-ui-fabric-react/lib/Checkbox';
import LabelRender          from '../../../common/LabelRender';
import features             from './features';


export default class RoomFilter extends Component {
  createCheckbox = feature => {
    const { checkedFeatures, onCheck } = this.props;
    const checked = checkedFeatures.has(feature);
    
    return (
      <Checkbox
        key={`filterFeature--${feature}`}
        label={feature}
        checked={checked}
        onChange={(evt, val) => onCheck(evt, feature)}
        className="RoomList--Checkbox"
      />
    );
  }

  render() {
    const label = 'Room Features';
    const info  = 'Select one or more features to filter rooms with selection.';
    const reqd  = false;

    return (
      <div className="RoomList--FeatureFilterWrapper">
        <LabelRender label={label} info={info} required={reqd} />
        <div className="RoomList--FeatureFilter">
          {features.map(this.createCheckbox)}
        </div>
      </div>
    );
  }
}