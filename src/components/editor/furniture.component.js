import React from 'react';
import { Group, Circle, Rect, Line, Text } from 'react-konva';

import { getDragShapeAttrs } from '../../utils';
import { styleTypes } from '../../constants';

class Furniture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      item_id: props.item_id,
      furn_type: props.furn_type,
      focused: props.focusedFurnId === props.item_id,
      chairsPerTable: props.chairsPerTable,
      floorplanFX: props.floorplanFX
    };
  }

  /* Lifecycle methods */
    // componentDidMount() called once
    // shouldComponentUpdate()
    // componentWillUpdate()
    // componentDidUpdate()
    // componentWillUpdate()

  componentWillReceiveProps(nextProps) {
    this.setState({
      x: nextProps.x,
      y: nextProps.y,
      focused: nextProps.focusedFurnId === this.state.item_id,
      chairsPerTable: nextProps.chairsPerTable
    });
  }

  /* Interaction methods */
  handleDragEnd(event) {
    let dragAttrs = getDragShapeAttrs(event);
    let validPosition = this.state.floorplanFX.ptInPolygon(dragAttrs);
    
    if (validPosition !== false) this.props.updateFurnItem(dragAttrs); 
  }

  /* Furniture items */
  renderCircle() {
    return (
      <Circle
        radius={9}
        fill={this.state.focused ? styleTypes.focused.fill : styleTypes.normal.fill }
        stroke={this.state.focused ? styleTypes.focused.stroke : styleTypes.normal.stroke }
        strokeWidth={this.state.focused ? styleTypes.focused.strokeWidth : styleTypes.normal.strokeWidth }
        shadowColor={this.state.focused ? styleTypes.focused.shadowColor : styleTypes.normal.shadowColor}
        shadowBlur={this.state.focused ? styleTypes.focused.shadowBlur : styleTypes.normal.shadowBlur}
        shadowOpacity={this.state.focused ? styleTypes.focused.shadowOpacity : styleTypes.normal.shadowOpacity}
        shadowOffset={this.state.focused ? styleTypes.focused.shadowOffset : styleTypes.normal.shadowOffset}
        name={'furnItem'}
      />
    );
  }

  renderRect() {
    return(
      <Rect
        width={27}
        height={12}
        fill={this.state.focused ? styleTypes.focused.fill : styleTypes.normal.fill }
        stroke={this.state.focused ? styleTypes.focused.stroke : styleTypes.normal.stroke }
        strokeWidth={this.state.focused ? styleTypes.focused.strokeWidth : styleTypes.normal.strokeWidth }
        draggable={true}
        name={'furnItem'}
      />
    );
  }

  renderBar() {
    return (
      <Circle
        radius={7}
        fill={this.state.focused ? styleTypes.focused.fill : styleTypes.unfocused.fill }
        stroke={this.state.focused ? styleTypes.focused.stroke : styleTypes.unfocused.stroke }
        strokeWidth={this.state.focused ? styleTypes.focused.strokeWidth : styleTypes.unfocused.strokeWidth }
        draggable={true}
        name={'furnItem'}
      />
    );
  }

  renderPoster() {
    return(
      <Rect
        width={30}
        height={5}
        fill={this.state.focused ? styleTypes.focused.stroke : styleTypes.normal.stroke }
        stroke={this.state.focused ? styleTypes.focused.stroke : styleTypes.normal.stroke }
        strokeWidth={this.state.focused ? styleTypes.focused.strokeWidth : styleTypes.normal.strokeWidth }
        draggable={true}
        name={'furnItem'}
      />
    );
  }

  renderTrash() {
    return (
      <Text
        text={"🗑️"}
        fontSize={18}
        draggable={true}
        name={'furnItem'}
      />
    );
  }

  renderCloseBtn() {
    return (
      <Text
        text={"✖"}
        fill={styleTypes.error.stroke}
        stroke={styleTypes.error.stroke}
        fontSize={18}
        offsetX={-20}
        offsetY={25}
        draggable={true}
        name={'closeBtn'}
      />
    );
  }

  render() {
    let furn_item;
    switch (this.state.furn_type) {
      case 'circle':
        furn_item = this.renderCircle();
        break;
      case 'rect':
        furn_item = this.renderRect();
        break;
      case 'bar':
        furn_item = this.renderBar();
        break;
      case 'poster':
        furn_item = this.renderPoster();
        break;
      case 'trash':
        furn_item = this.renderTrash();
        break;
      default:
        furn_item = this.renderCircle();
        break;
    }

    return(
      <Group
        draggable={true}
        x={this.state.x}
        y={this.state.y}
        id={this.state.item_id}
        name={this.state.furn_type}
        onDragEnd={(event) => this.handleDragEnd(event)}
      >
        {furn_item}
      </Group>
    );
  }
}

export default Furniture;