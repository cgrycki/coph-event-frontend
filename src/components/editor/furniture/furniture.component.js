import React from 'react';
import { Group, Circle, Rect, Line, Text } from 'react-konva';

const itemStyles = {
    unfocused: {
        fill: '#d9d9d9',
        stroke: '#252525',
        strokeWidth: 2
    },
    normal: {
        fill: '#969696',
        stroke: '#252525',
        strokeWidth: 2
    },
    focused: {
        fill: '#c6dbef',
        stroke: '#252525',
        strokeWidth: '3',
        shadowColor: 'black',
        shadowBlur: 5,
        shadowOpacity: 0.5,
        shadowOffset: {x: 0, y: 10}
    }
};

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
    //onHover() {}


    /* Furniture items */
    renderCircle() {
        return (
            <Circle
                radius={20}
                fill={this.state.focused ? itemStyles.focused.fill : itemStyles.normal.fill }
                stroke={this.state.focused ? itemStyles.focused.stroke : itemStyles.normal.stroke }
                strokeWidth={this.state.focused ? itemStyles.focused.strokeWidth : itemStyles.normal.strokeWidth }
                draggable={true}
            />
        );
    }

    renderRect() {
        return(
            <Rect
                width={50}
                height={30}
                fill={this.state.focused ? itemStyles.focused.fill : itemStyles.normal.fill }
                stroke={this.state.focused ? itemStyles.focused.stroke : itemStyles.normal.stroke }
                strokeWidth={this.state.focused ? itemStyles.focused.strokeWidth : itemStyles.normal.strokeWidth }
                draggable={true}
            />
        );
    }

    renderBar() {
        return (
            <Circle
                radius={12}
                fill={this.state.focused ? itemStyles.focused.fill : itemStyles.unfocused.fill }
                stroke={this.state.focused ? itemStyles.focused.stroke : itemStyles.unfocused.stroke }
                strokeWidth={this.state.focused ? itemStyles.focused.strokeWidth : itemStyles.unfocused.strokeWidth }
                draggable={true}
            />
        );
    }

    renderPoster() {
        return(
            <Rect
                width={40}
                height={8}
                fill={this.state.focused ? itemStyles.focused.stroke : itemStyles.normal.stroke }
                stroke={this.state.focused ? itemStyles.focused.stroke : itemStyles.normal.stroke }
                strokeWidth={this.state.focused ? itemStyles.focused.strokeWidth : itemStyles.normal.strokeWidth }
                draggable={true}
            />
        );
    }

    renderTrash() {
        return (
            <Text
                text={"🗑️"}
                //stroke={this.state.focused ? itemStyles.focused.stroke : itemStyles.normal.stroke }
                fontSize={32}
                draggable={true}
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
            >
                {furn_item}
            </Group>
        );
    }
}

export default FurnitureComponent;