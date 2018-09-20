import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRooms } from '../actions';
import RoomList from './Form/fields/RoomListNew/RoomListNew';


class TestComponent extends Component {
  componentDidMount() {
    const { rooms, rooms_loading, fetchRooms } = this.props;
    if ((rooms.length === 0) && !rooms_loading) fetchRooms();
  }

  render() {
    const { rooms, rooms_loading } = this.props;
    return (
      <div className="FormFieldRow">
        <RoomList rooms={rooms} rooms_loading={rooms_loading} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ...state.rooms
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);