import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRooms, updateForm } from '../actions';
import Comments from './Form/fields/Comments/Comments';


class TestComponent extends Component {
  componentDidMount() {
    return this.props.fetchRooms();
  }

  getSelectedRoom = (room_number) => {
    const { rooms } = this.props;
    if (room_number === '') return undefined;
    else return rooms.filter(rm => rm.roomNumber === room_number)[0];
  }

  render() {
    let { info: { room_number }} = this.props;
    if (room_number === '') room_number = 'N120';
    const selectedRoom = this.getSelectedRoom(room_number);

    return (
      <div>
        <Comments 
          value={this.props.info['comments']}
          error={this.props.errors['comments']}
          onChange={this.props.updateForm}
          room={selectedRoom}
        />
      </div>
    );
  }
}




const mapStateToProps = state => ({
  info: state.form.fields,
  errors: state.form.errors,
  rooms: state.rooms.rooms
})

const mapDispatchToProps = dispatch => ({
  updateForm: (field, value) => dispatch(updateForm(field, value)),
  fetchRooms: () => dispatch(fetchRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);