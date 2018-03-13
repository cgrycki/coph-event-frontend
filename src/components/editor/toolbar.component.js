import React from 'react';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';

const Toolbar = (props) => {
  console.log(props);
  return (
    <ButtonToolbar>
      <ButtonGroup className="float-left">
        <Button 
          active={props.selectedFurnType === 'circle'}
          color={props.selectedFurnType === 'circle' ? 'dark' : 'light'}
          size="sm"
        >
          Circle
        </Button>
        <Button
          active={props.selectedFurnType === 'rect'}
          size="sm"
        >
          Rect
        </Button>
        <Button
          active={props.selectedFurnType === 'rect'}
          size="sm"
        >
          Bar
        </Button>
        <Button
          active={props.selectedFurnType === 'rect'}
          size="sm"
        >Poster</Button>
        <Button
          active={props.selectedFurnType === 'rect'}
          size="sm"
        >Trash</Button>
      </ButtonGroup>

      <ButtonGroup className="float-right">
        <Button 
          size="sm"
        >6</Button>
        <Button size="sm">8</Button>
      </ButtonGroup>

    </ButtonToolbar>
  );
}
export default Toolbar