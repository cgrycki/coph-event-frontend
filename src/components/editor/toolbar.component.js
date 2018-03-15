import React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import { funitureTypes, furnitureTypes } from '../../constants';

const GuiButton = (props) => {
  /* Creates a button that triggers editor state changes via onClick(). */
  // value
  // label
  // icon
  // selectedFurnType
  
  let btnActive = props.selectedVal === props.value;
  return (
    <Button
      outline={btnActive}
      size="sm"
      className="guiBtn"
      active={btnActive}
      color={btnActive ? 'primary' : 'link'}
      onClick={() => props.onClick(props.value)}
      id={props.value + '-toolbar-radio'}
    >
      {props.label}
    </Button>
  );
}

const Toolbar = (props) => {

  let furnitureBtns = furnitureTypes.map((btn, i) => (
    <GuiButton
      key={"toolbar-radio-" + i}
      selectedVal={props.selectedFurnType}
      onClick={props.updateSelectedFurnType}
      value={btn.value}
      label={btn.label}
    />)
  );

  let chairBtns = [
    { value: 6, label: 6, icon: ''}, { value: 8, label: 8, icon: ''}
  ].map((btn, i) => (
    <GuiButton
      key={"toolbar-radio-" + i}
      selectedVal={props.chairsPerTable}
      onClick={props.updateChairsPerTable}
      value={btn.value}
      label={btn.label}
    />)
  );

  return (
    <div className="clearfix">
        <div className="float-left">
          <span>Add Furniture:&nbsp;</span>
          <ButtonGroup>{furnitureBtns}</ButtonGroup>
        </div>

        <div className="float-right">
          <span>Chairs Per Table:&nbsp;</span>
          <ButtonGroup>{chairBtns}</ButtonGroup>
        </div>
    </div>
  );
}
export default Toolbar