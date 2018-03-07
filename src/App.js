import React, { Component } from 'react';
import './css/App.css';

import { Grid, Row, Col, Panel } from 'react-bootstrap';

import FormPanel from './components/FormPanel';
import Toolbar from './components/Editor/Toolbar';
import Editor from './components/Editor/Editor';
import { canvasContentClick, canvasEmptyClick } from './Furniture';
import { 
  handleFormChange, handleFormSubmit, handleDragEnd, 
  todays_date_str
} from './utils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      forms: {
        'EventName':      '',
        'EventDate':      todays_date_str(),
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
        'TrashCan':       0
      },
      calculated: {
        'Chairs':         0,
        'ChairCarts':     0,
        'CircleCarts':    0,
        'RectangleCarts': 0,
        'BarCarts':       0
      },
      editorURL: null
    };

    this.handleFormChange   = handleFormChange.bind(this);
    this.handleFormSubmit   = handleFormSubmit.bind(this);
    this.handleDragEnd      = handleDragEnd.bind(this);
    this.canvasContentClick = canvasContentClick.bind(this);
    this.canvasEmptyClick   = canvasEmptyClick.bind(this);
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <FormPanel
              handleChange={this.handleFormChange}
              handleSubmit={this.handleFormSubmit}
              EventName={this.state.forms.EventName}
              EventDate={this.state.forms.EventDate}
              EventTime={this.state.forms.EventTime}
              ChairsPerTable={this.state.forms.ChairsPerTable}
              EventComments={this.state.forms.EventComments}
              UserEmail={this.state.forms.UserEmail}
            />
          </Col>
          <Col xs={12} sm={10} md={8}>
            <Toolbar
              onClick={this.handleFormChange}
              SelectedFurniture={this.state.forms.SelectedFurniture}
            />
            <Editor
              onClick={this.canvasEmptyClick}
              onContentClick={this.canvasContentClick}
              handleDragEnd={this.handleDragEnd}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
