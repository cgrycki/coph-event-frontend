// Dependencies
import React            from 'react';
import PropTypes        from 'prop-types';
import { Layer, Image } from 'react-konva';

// Assets
import floorplan        from '../assets/floorplan-lg-opaque.png';


/**
 * The Floorplan component is responsible for loading a floorplan image and rendering it within
 * a Konva layer. The Floorplan component is the base of the Editor canvas.
 * 
 * @module
 * @param {number} width Constrained width of canvas container.
 * @param {number} height Constrained height of canvas container.
 */
export default class Floorplan extends React.Component {
  static propTypes = {
    width : PropTypes.number,
    height: PropTypes.number
  }

  state = { 
    img: null
  }

  /** Loads image on mount, setting the data and *then* drawing to rendered canvas layer. */
  componentDidMount() {
    const img   = new window.Image();
    img.src     = floorplan;
    img.onload  = () => { 
      this.setState({ img }, () => {
        this.floorplan.cache();
        this.floorplan.getLayer().draw();
      });
    }
  }

  /** Renders the floorplan image at `width * height` dimensions. */
  render() {
    return (
      <Layer>
        <Image 
          image={this.state.img}
          ref={node => this.floorplan = node}
          width={this.props.width}
          height={this.props.height}
          name="Floorplan"
        />
      </Layer>
    );
  }
}