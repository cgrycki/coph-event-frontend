import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRooms, updateForm } from '../actions';
import RoomList from './Form/fields/RoomList';


class TestComponent extends Component {
  componentDidMount() {
    const { rooms, rooms_loading, fetchRooms } = this.props;
    if ((rooms.length === 0) && !rooms_loading) fetchRooms();
  }

  render() {
    const { rooms, rooms_loading } = this.props;
    return (
      <div className="FormFieldRow">
        <RoomList
          rooms={rooms}
          rooms_loading={rooms_loading}
          value={this.props.value}
          error={this.props.errors['room_number']}
          onChange={this.props.updateForm}
        />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  value: state.form.fields.room_number,
  errors: state.form.errors,
  ...state.rooms
})

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms()),
  updateForm: (field, value) => dispatch(updateForm(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);