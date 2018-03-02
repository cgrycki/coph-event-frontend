import React, { Component } from 'react';
import './css/App.css';

import { Grid, Row, Col, Panel } from 'react-bootstrap';

import Toolbar from './components/Editor/Toolbar';
import DragDrop from './components/Editor/DragDrop';

import { handleFormChange, handleFormSubmit, handleDragEnd } from './utils';

// Compute today on application load, as we want the dates
// to be at least a week from now.
var today = new Date();
var today_str = today.toISOString().substring(0, 10);

class App extends Component {
  constructor() {
    super();
    this.state = {
      forms: {
        'EventName':      '',
        'EventDate':      '',
        'EventTime':      '08:00',
        'ChairsPerTable':  6,
        'EventComments':  '',
        'UserEmail':      '',
        'SelectedFurniture': 'Circular'
      },
      furniture: {
        'Circular':       0,
        'Rectangular':    0,
        'Bar':            0,
        'Poster':         0,
        'TrashCan':      0
      },
      calculated: {
        'Chairs':         0,
        'ChairCarts':     0,
        'CircleCarts':    0,
        'RectangleCarts': 0
      },
      editorURL: null
    };

    this.handleFormChange = handleFormChange.bind(this);
    this.handleFormSubmit = handleFormSubmit.bind(this);
    this.handleDragEnd    = handleDragEnd.bind(this);
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={10} md={8}>
            <Toolbar
              onClick={this.handleFormChange}
              SelectedFurniture={this.state.forms.SelectedFurniture}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
