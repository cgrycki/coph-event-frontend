import React, { Component } from 'react';

export default class Prompt extends Component {
  getRoomName = room => {
    if (room === '' || room === undefined) return '';
    else return room.roomNumber;
  }

  getRoomFeatures = room => {
    if (room === undefined) return;
    else if (!room.hasOwnProperty('featureList')) return;
    else return room.featureList.map(ft => {
      return (<span className="Prompt--feature" key={`ft-${ft}`}>{ft}</span>);
    });
  }

  render() {
    const { room } = this.props;

    return (
      <React.Fragment>
        <div className="PromptDiv">
          <h3 title="Audio/Visual & Information Technology">A/V & IT</h3>
          <p>Please note in the comments below if you require Audio or Visual support; we will coordinate your request with our Academic Technology staff prior to the event. If instead you require Information Technology, comment below and we will coordinate with our IT Support group prior to the event.</p>
          <p><i>Note, after hours support is limited and any costs associated would be the responsibility of the event sponsor.</i></p>
        </div>
        
        <div className="PromptDiv">
          <h3>Hours</h3>
          <p>If you are making a request for space outside of the normal building hours, note the times in which the building or rooms need to be opened and closed so that CPH Facilities can make the necessary adjustments with UI Facilities Management Access Control prior to your event.</p>
        </div>

        <div className="PromptDiv">
          <h3>Room ({this.getRoomName(room)}) Features</h3>
          <p>For reference: your selected room has the following features. Please note in the comments below if you require additional technology and we will try our best to accomodate.</p>
          <div className="Prompt--featureWrapper">
            {this.getRoomFeatures(room)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}