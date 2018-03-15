import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';

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
                <td>Capacity</td>
                <td>{numChairs}</td>
              </tr>
              <tr>
                <td>Circle Tables</td>
                <td>{numCircles}</td>
              </tr>
              <tr>
                <td>Rectangular Tables</td>
                <td>{numRects}</td>
              </tr>
              <tr>
                <td>Bar Tables</td>
                <td>{numBars}</td>
              </tr>
              <tr>
                <td>Poster Boards</td>
                <td>{numPosters}</td>
              </tr>
              <tr>
                <td>Trash Cans</td>
                <td>{numTrashs}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}