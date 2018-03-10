import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormContainer from './form.container';

const App = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={6} md={5} lg={3}>
          <p>Hello, world!</p>
          <FormContainer />
        </Col>
        <Col xs={12} sm={6} md={7} lg={9}>
          <p>And another one for the fans! <b>Hello, world!</b></p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
