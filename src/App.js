import React, { Component } from 'react';
import './css/App.css';

import { Grid, Row, Col, Panel } from 'react-bootstrap';

import Toolbar from './components/Editor/Toolbar';
import DragDrop from './components/Editor/DragDrop';

// Compute today on application load, as we want the dates
// to be at least a week from now.
var today = new Date();
var today_str = today.toISOString().substring(0, 10);

class App extends Component {
  constructor() {
    super();

    this.state = {
      // Form fields
      'EventName':      '',
      'EventDate':      today_str,
      'EventTime':      '08:00',
      'ChairsPerTable':  6,
      'EventComments':  '',
      'UserEmail':      '',

      // Drag 'n Drop editor Fields
      'NumCircleTables':  1,
      'NumRectTables':    0,
      'NumBarTables':     0,
      'NumPosterBoards':  0,
      'NumTrashCans':     0,
      'LayoutBase64':     '',

      // Calculated fields
      'NumChairs':        0,
      'NumChairCarts':    0,
      'NumCircleCarts':   1
    };

    this.handleSubmit  = this.handleSubmit.bind(this);
    this.handleChange  = this.handleChange.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    if (this.state.LayoutBase64 === '') alert("You need to add tables to the editor.");
  }

  handleChange(event) {
    /*
     * @method
     * @description Function to update our form's state on input change.
     * @param (event) event - Event triggered by input value change.
     * @returns none - State is updated by name of input group.
     */
    const target = event.target;
    const value  = target.value;
    const name   = target.name;

    // If the target type is a radio, then we know this event is coming
    // from the 'NumChairsPerTable' field. We should do the following...
    //    - parse radio value as integer
    //    - Update the number of people we can seat (sittable tables * chairs/table)
    //    - Update the number of chair carts needed to accomodate ^ (Ceil(num_chairs / chairs/cart=48))
    //    - Update number of carts needed for sittable tables (Ceil(sittable tables / tables/cart=6))
    if (target.type === 'radio') {
      const value_int = parseInt(value, 10);
      const num_chairs = this.state.NumCircleTables * value_int;

      this.setState({
        [name]: value_int,
        'NumChairs': num_chairs,
        'NumChairCarts': Math.ceil(num_chairs / 48),
        'NumCircleCarts': Math.ceil(this.state.NumCircleTables / 6)
      });

    } else {
      this.setState({ [name]: value });
      }
  }

  handleDragEnd(event) {
    /*
     * @method
     * @description Updates our layout state when a movement has been made.
     * Attaches to the stage, and on drag end takes a snapshot.
     */

    let stage = event.currentTarget;
    let data_url = stage.toDataURL();
    this.setState({ 'LayoutBase64': data_url });
    console.log(this.state);
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={10} md={8}>
            <Toolbar/>
            <DragDrop
              handleDragEnd={this.handleDragEnd}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
