import React from 'react';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';

const Toolbar = (props) => {
  return (
    <ButtonToolbar>
      <ButtonGroup>
        <Button>Circle</Button>
        <Button>Rect</Button>
        <Button>Bar</Button>
        <Button>Poster</Button>
        <Button>Trash</Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}
export default Toolbar