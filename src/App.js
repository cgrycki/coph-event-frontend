import React, { Component } from 'react';
import './App.css';

import { Grid, Row, Col, Panel } from 'react-bootstrap';
import FormPanel from './components/FormPanel';
import DragDrop from './components/DragDrop';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Form fields
      'EventName':      '',
      'EventDate':      '',
      'EventTime':      '',
      'ChairsPerTable':  6,
      'EventComments':  '',
      'UserEmail': '',

      // Editor Fields
      'NumRoundTables': 0,
      'NumCircleTables': 0,
      'NumPosterBoards': 0,
      'NumTrashCans': 0,
      'LayoutPNG': ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  handleChange (event) {
    /*
     * @method
     * @description Function to update our form's state on input change.
     * @param (event) event - Event triggered by input value change.
     * @returns none - State is updated by name of input group.
     */
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(target, value, name);
    
    this.setState({ [name]: value });
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Panel>
              <FormPanel
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                EventName={this.state.EventName}
                EventDate={this.state.EventDate}
                EventTime={this.state.EventTime}
                ChairsPerTable={this.state.ChairsPerTable}
                EventComments={this.state.EventComments}
                UserEmail={this.state.UserEmail}
              />
            </Panel>
          </Col>
          <Col xs={12} sm={6} md={8}>
            <DragDrop/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
