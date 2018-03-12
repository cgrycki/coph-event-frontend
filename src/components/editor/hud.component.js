import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';

export default class HUD extends React.Component {
  render() {
    return (
      <Card>
        <CardTitle tag="h5">HUD</CardTitle>
        <CardBody>
          <p><b>Capacity: </b>Dynamically updated value</p>
        </CardBody>
      </Card>
    );
  }
}