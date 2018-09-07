/**
 * Furniture Component
 */
import React      from 'react';
import PropTypes  from 'prop-types';
import {connect}  from 'react-redux';
import { 
  Group, 
  Circle,
  Rect
}  from 'react-konva';
import {
  updateEditorItem,
  selectEditorItem
} from '../../../../actions/diagram.actions';


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

  /** Updates item's position in store. */
  handleMove = event => {
    if (!this.node) return;
    let intersectFlag = false;
    let target = event.target;

    // Highlight intersections: collect pointers to drag item and encapsulating layer
    let { x: targetX, y: targetY } = target.attrs;
    let targetBounds               = target.getClientRect();
    let furnitureLayer             = target.parent;

    // Check intersections with each furniture item in layout
    furnitureLayer.children.forEach(function(group) {
      // Dont compare against self
      if (group === event.target) return true;

      // Check distance between group/target centers
      let { x: otherX, y: otherY } = group.attrs;
      let dist = pointDistance(targetX, targetY, otherX, otherY);
      // If the distance is greather than intersect possible, unflag shape and continue
      if (dist > 50) {
        target.findOne('.boundsHint').stroke('rgba(0,0,0,0)');
        return true;
      }
      else {
        target.findOne('.boundsHint').stroke('red');
        intersectFlag = true;
      }

      // Otherwise check for the intersection
      //if (haveIntersection(group.getClientRect(), targetBounds))
        //group.findOne('.boundsHint').stroke('red');
      //else
        //group.findOne('.boundsHint').stroke('rgba(0,0,0,0)');
    });

    // Update position
    let {id, x, y, name: furn } = this.node.attrs;
    this.props.updateEditorItem(furn, id, x, y);
  }


  render() {
    let {x, y, id, furn, draggable} = this.props;
    return (
      <Group
        ref={node => { this.node = node; }}
        draggable={draggable}
        x={x}
        y={y}
        id={id}
        name={furn}
        
        // Update position on move
        onDragMove={this.handleMove}
        onTouchMove={this.handleMove}
      >
        <Circle 
          radius={16}
          fill='#f4f4f4'
          name='boundsHint'
        />
        <Circle
          radius={9}
          fill='#ffffff'
          stroke='#333333'
          strokeWidth={1.5}
          //shadowColor
          //shadowBlur
          //shadowOpacity
          //shadowOffset
          name='furnItem'
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
      </Group>
    );
  }
}


// Redux Container
const mapDispatchToProps = dispatch => ({
  updateEditorItem: (furn, id, x, y) => dispatch(updateEditorItem(furn, id, x, y))
});

export default connect(null, mapDispatchToProps)(Furniture);




/*
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    id: PropTypes.string,
    furn: PropTypes.string
  }
  */