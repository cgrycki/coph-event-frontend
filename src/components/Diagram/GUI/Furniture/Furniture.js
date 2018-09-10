/**
 * Furniture Component
 */
import React      from 'react';
import PropTypes  from 'prop-types';
import { connect }  from 'react-redux';
import { 
  Group, 
  Circle,
  Text
}  from 'react-konva';
import { updateEditorItem } from '../../../../actions/diagram.actions';


/**
 * Finds the intersection between two rectangles, if present.
 * @param {object} r1 Polygonal object
 * @param {object} r2 Polygonal object
 * @returns {boolean} Weither the two shapes have an overlap.
 */
function haveIntersection(r1, r2) {
  return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
  );
}

/**
 * Returns the Euclidean distance between two points.
 * @param {number} x1 Point 1 x
 * @param {number} y1 Point 1 y
 * @param {number} x2 Point 2 x
 * @param {number} y2 Point 2 y
 * @returns {number} distance Distance in pixels between two points.
 */
function pointDistance(x1, y1, x2, y2) {
  return Math.sqrt(
    Math.pow((x2 - x1), 2) +
    Math.pow((y2 - y1), 2)
  );
}


class Furniture extends React.Component {
  /** Sets dragStart coords in case we need to revert to starting position. */
  handleDragStart = () => {
    if (!this.node) return;
    // Move node to top of layer (possibly hit layer?)
    this.node.moveToTop();

    // Set collision to false
    this.node.setAttr('collision', false);

    // Set position in case of collisions
    const { x, y } = this.props;
    this.node.setAttr('dragStartX', x);
    this.node.setAttr('dragStartY', y);
  }

  /** Updates group collision attribute and sets position in app store. */
  handleDragMove = () => {
    if (!this.node) return;
    const target = this.node;
    // const stage = target.getStage();


    // Highlight intersections: collect pointers to drag item and encapsulating layer
    const { x: targetX, y: targetY } = target.attrs;
    // const targetBounds               = target.getClientRect();
    const furnitureLayer             = target.parent;

    // Check intersections with each furniture item in layout
    furnitureLayer.children.each((group) => {
      // Dont compare against self
      if (group === target) return true;

      // Check distance between group/target centers
      const { x: otherX, y: otherY } = group.attrs;
      const dist = pointDistance(targetX, targetY, otherX, otherY);

      // If the distance is greather than intersect possible,
      // then flag node attribute and continue
      if (dist < 50) target.setAttr('collision', true);
    });

    // Update position
    const { id, x, y, name: furn } = this.node.attrs;
    this.props.updateEditorItem(furn, id, x, y);
  }

  /** Resets a furniture item if it's out of bounds or colliding */
  handleDragEnd = () => {
    if (!this.node) return;

    // Check for intersections
    const { updateEditorItem } = this.props;
    const {
      collision,
      id,
      name: furn,
      dragStartX: x,
      dragStartY: y
    } = this.node.getAttrs();

    // If we find a collision then we move the group to it's starting
    // drag position. In addition we set the collision to false to
    // reset its styling.
    if (collision === true) {
      this.node.setAttr('collision', false);
      updateEditorItem(furn, id, x, y);
    }
  }

  /** Renders an 'X' button when the group is selected. */
  renderDeleteButton = () => {
    return (
      <Text
        text={"✖"}
        fontSize={18}
        offsetX={-15}
        offsetY={25}
        name="closeButton"
      />
    );
  }

  render() {
    const { x, y, id, furn, draggable, selected_item } = this.props;

    // Dont allow dragging unless item is selected
    const draggableMaster = ((id === selected_item) && draggable);

    // Get collision status
    const collision = (this.node) ? this.node.getAttr('collision') : false;

    return (
      <Group
        ref={(node) => { this.node = node; }}
        draggable={draggableMaster}
        x={x}
        y={y}
        id={id}
        name={furn}

        // Set OG position on drag start
        onDragStart={this.handleDragStart}

        // Update position + collisions on move
        onDragMove={this.handleDragMove}
        onTouchMove={this.handleDragMove}

        // Check for collisions
        onDragEnd={this.handleDragEnd}
      >
        <Circle
          radius={16}
          fill="#f4f4f4"
          name="boundsHint"
          stroke={collision ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)'}
        />
        <Circle
          radius={9}
          fill="#ffffff"
          stroke={(id === selected_item) ? '#0078d4' : '#333333'}
          strokeWidth={1.5}
          // shadowColor
          // shadowBlur
          // shadowOpacity
          // shadowOffset
          name="furnItem"
          hitFunc={function(context) {
            let width = this.width();
            let height = this.height();
            
            context.beginPath();
            context.rect(-20, -20, width+40, height+40);
            //context.arc(0, 0, this.getOuterRadius()+20, 0, Math.PI * 2, true)
            context.closePath();
            context.fillStrokeShape(this);
          }}
        />
        {draggableMaster && this.renderDeleteButton()}
      </Group>
    );
  }
}


// Redux Container
const mapStateToProps = state => ({
  selected_item: state.diagram.layout.selected_item
})

const mapDispatchToProps = dispatch => ({
  updateEditorItem: (furn, id, x, y) => dispatch(updateEditorItem(furn, id, x, y))
});

export default connect(mapStateToProps, mapDispatchToProps)(Furniture);