import React from 'react';
import { Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap';

import FormContainer from './form.container';
import EditorContainer from './editor.container';


const App = () => {
  return (
    <Container>
      <Row>
        <Navbar color="black" dark>
          <NavbarBrand>College of Public Health</NavbarBrand>
        </Navbar>
      </Row>
      <Row>
        <Col xs={12} sm={6} lg={4}>
          <FormContainer />
        </Col>
        <Col xs={12} sm={6} lg={8}>
          <EditorContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
