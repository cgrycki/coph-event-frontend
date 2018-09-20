import React, { Component } from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import features from './features';


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
    return (
      <React.Fragment>
        <Label className="RoomList--FeatureLabel">Room Features</Label>
        <div className="RoomList--FeatureFilter">
          {features.map(this.createCheckbox)}
        </div>
      </React.Fragment>
    );
  }
}