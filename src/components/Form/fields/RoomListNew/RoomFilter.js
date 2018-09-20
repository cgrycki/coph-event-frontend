import React, { Component } from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import features from './features';


export default class RoomFilter extends Component {
  createCheckbox = feature => {
    const { checkedFeatures, onCheck } = this.props;
    return (
      <Checkbox
        key={`filterFeature--${feature}`}
        label={feature}
        checked={checkedFeatures.has(feature)}
        onChange={() => onCheck(feature)}
        className="RoomList--Checkbox"
      />
    );
  }

  render() {
    return (
      <div className="RoomList--FeatureFilter">
        {features.map(this.createCheckbox)}
      </div>
    );
  }
}