import React      from 'react';
import PropTypes  from 'prop-types';
import { Layer }  from 'react-konva';
import Furniture  from './Furniture';


export default class FurnitureLayer extends React.Component {
  //static propTypes = {
  //  items: PropTypes.arrayOf(PropTypes.object)
  //}

  render() {
    return (
      <Layer>
        {this.props.items.map(d => (<Furniture key={d.id} {...d} />) )}
      </Layer>
    );
  }
}