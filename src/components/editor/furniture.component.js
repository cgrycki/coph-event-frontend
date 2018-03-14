import React from 'react';
import { Group, Circle, Rect, Line, Text } from 'react-konva';

import { changePointer } from '../../utils';
import styleTypes from '../../constants/styleTypes';

class FurnitureComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: props.x,
            y: props.y,
            item_id: props.item_id,
            furn_type: props.furn_type,
            updateFurnItem: props.updateFurnItem,
            removeFurnItem: props.removeFurnItem
        };
    }

    /* Lifecycle methods */
        // componentDidMount() called once
        // shouldComponentUpdate()
        // componentWillUpdate()
        // componentDidUpdate()
        /* componetWillReceiveProps(nextProps) {
            // Sync furniture item to props handed from Redux
            this.setState({
                x: nextProps.x,
                y: nextProps.y
            });
        }*/

    /* Interaction methods */
    setFocus() {
        changePointer('move');
    }

    setDefault() {
        changePointer('default');
    }


    /* Furniture items */
    renderCircle() {
        return (
            <Circle
                radius={20}
                fill={this.state.focused ? styleTypes.focused.fill : styleTypes.normal.fill }
                stroke={this.state.focused ? styleTypes.focused.stroke : styleTypes.normal.stroke }
                strokeWidth={this.state.focused ? styleTypes.focused.strokeWidth : styleTypes.normal.strokeWidth }
                draggable={true}
                name={'furnItem'}
            />
        );
    }

    renderRect() {
        return(
            <Rect
                width={50}
                height={30}
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
                radius={12}
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
                width={40}
                height={8}
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
                //stroke={this.state.focused ? styleTypes.focused.stroke : styleTypes.normal.stroke }
                fontSize={32}
                draggable={true}
                name={'furnItem'}
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
        }

        return(
            <Group
                x={this.state.x}
                y={this.state.y}
                id={this.state.item_id}
                name={this.state.furn_type}
                onDragEnd={this.state.updateFurnItem}
                onDblClick={this.state.removeFurnItem}
                draggable={true}
                onMouseOver={() => this.setFocus()}
                onMouseOut={() => this.setDefault()}
            >
                {furn_item}
            </Group>
        );
    }
}

export default FurnitureComponent;