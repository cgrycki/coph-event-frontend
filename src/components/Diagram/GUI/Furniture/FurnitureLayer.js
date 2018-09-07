import React      from 'react';
import PropTypes  from 'prop-types';
import { Layer }  from 'react-konva';
import Furniture  from './Furniture';


export default class FurnitureLayer extends React.Component {
  static propTypes = {
    items    : PropTypes.arrayOf(PropTypes.object),
    draggable: PropTypes.bool
  }

  static defaultProps = {
    items    : [],
    draggable: true
  }

  render() {
    let { items, draggable } = this.props;

    return (
      <Layer>{items.map(d => (
        <Furniture
          key={d.id}
          {...d}
          draggable={draggable}
        />))}
      </Layer>
    );
  }
}