import React, { Component } from 'react';
import './App.css';

import { Grid, Row, Col, Panel } from 'react-bootstrap';
import FormPanel from './components/FormPanel';
import DragDrop from './components/DragDrop';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Panel>
              <FormPanel/>
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
