// Dependencies
import React            from 'react';
import PropTypes        from 'prop-types';
import { Layer, Image } from 'react-konva';
import FloorplanFunctions from './FloorplanFunctions';

// Assets
import floorplan        from '../../assets/ai/Artboard 1.svg';
const FLOOR_WIDTH = 1920;
const FLOOR_HEIGHT= 1500;


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

  static defaultProps = {
    width : 960,
    height: 500
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
    };
  }


  /** Renders the floorplan image at `width * height` dimensions. */
  render = () => {
    const { img }            = this.state;
    const { width, height }  = this.props;
    const { scaleX, scaleY } = FloorplanFunctions.resizeImageDimensionsToCanvas(width, height);

    return (
      <Layer>
        <Image
          image={img}
          ref={(node) => { this.floorplan = node; }}
          width={FLOOR_WIDTH}
          height={FLOOR_HEIGHT}
          scaleX={scaleX}
          scaleY={scaleY}
          name="Floorplan"
        />
      </Layer>
    );
  }
}
