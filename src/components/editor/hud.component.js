import React from 'react';
import { Card, CardTitle, CardBody, Table } from 'reactstrap';

export default class HUD extends React.Component {
  render() {
    const { numChairs, numCircles, numRects, numBars, numPosters, numTrashs } = this.props;

    return (
      <Card>
        <CardBody>
          <Table size="sm">
            <thead>
              <tr>
                <th>Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">Capacity</td>
                <td>{numChairs}</td>
              </tr>
              <tr>
                <td scope="row">Circle Tables</td>
                <td>{numCircles}</td>
              </tr>
              <tr>
                <td scope="row">Rectangular Tables</td>
                <td>{numRects}</td>
              </tr>
              <tr>
                <td scope="row">Bar Tables</td>
                <td>{numBars}</td>
              </tr>
              <tr>
                <td scope="row">Poster Boards</td>
                <td>{numPosters}</td>
              </tr>
              <tr>
                <td scope="row">Trash Cans</td>
                <td>{numTrashs}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}