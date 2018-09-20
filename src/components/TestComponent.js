import React, { Component } from 'react';
//import { connect } from 'react-redux';

import Diagram from './Diagram';
import LayoutSerialize from './Diagram/Surfaces/LayoutSerialize';


export default class TestComponent extends Component {

  render() {
    return (
      <div className="FormFieldRow">
        <Diagram draggable={true}/>
        <LayoutSerialize />
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
})

//export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);