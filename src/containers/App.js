import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import FormContainer from './form.container';


const App = () => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <p>Hello, world!</p>
          <FormContainer />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <p>And another one for the fans! <b>Hello, world!</b></p>
        </Col>
      </Row>
    </Grid>
  );
}

export default App;
