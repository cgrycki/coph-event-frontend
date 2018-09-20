import React, { Component } from 'react';
import features             from './features';
import RoomFilter           from './RoomFilter';
import RoomDropdown         from './RoomDropdown';
import './RoomList.css';


export default class RoomListNew extends Component {
  state = {
    checkedFeatures: new Set(),
    featuresList   : features
  }

  onCheck = (evt, feature) => {
    evt.preventDefault();
    let newCheckedFeatures = new Set(this.state.checkedFeatures);

    // Add or remove the feature from our state
    if (newCheckedFeatures.has(feature)) newCheckedFeatures.delete(feature);
    else newCheckedFeatures.add(feature);

    this.setState({ checkedFeatures: newCheckedFeatures });
  }

  render() {
    const { checkedFeatures } = this.state;
    const { rooms, rooms_loading, value, error, onChange } = this.props;

    return (
      <div className="ms-Grid-row">
        <RoomDropdown
          value={value}
          error={error}
          onChange={onChange}
          rooms={rooms}
          rooms_loading={rooms_loading}
          checkedFeatures={checkedFeatures}
        />
        <RoomFilter
          checkedFeatures={checkedFeatures}
          onCheck={this.onCheck}
        />
      </div>
    );
  }
}