import React from 'react';
import { Layer, Image } from 'react-konva';
import floorplanSrc from '../../assets/floorplan-lg-opaque.png';

export default class Floorplan extends React.Component {
  state = {
    img: null
  };

  componentDidMount() {
    const image = new window.Image();
    image.src = floorplanSrc;
    image.onload = () => {
      this.setState({img: image});
    };
  }

  render() {
    return (
      <Layer 
        ref={"floorplanLayer"}
        listening={false}
      >
        <Image 
          image={this.state.img}
          width={this.props.width}
          height={this.props.height}
        />
      </Layer>
    );
  }
}