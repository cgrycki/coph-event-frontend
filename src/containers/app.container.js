import React from 'react';
import { Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap';

import FormContainer from './form.container';
import Editor from '../components/editor/editor.component';

const App = () => {
  return (
    <Container>
      <Row>
        <Navbar color="black" dark>
          <NavbarBrand>
            <strong>Create an Event &nbsp; &nbsp;</strong>
            College of Public Health
          </NavbarBrand>
        </Navbar>
      </Row>
      <Row>
        <Col xs={12} sm={6} lg={4}>
          <FormContainer />
        </Col>
        <Col xs={12} sm={6} lg={8}>
          <Editor />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
