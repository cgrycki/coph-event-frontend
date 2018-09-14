import React      from 'react';
import PropTypes  from 'prop-types';
import { Layer }  from 'react-konva';
import Furniture  from './Furniture';
import TransformerComponent from '../TransformerComponent';



export default class FurnitureLayer extends React.Component {
  static propTypes = {
    items        : PropTypes.arrayOf(PropTypes.object),
    draggable    : PropTypes.bool,
    selected_item: PropTypes.string
  }

  static defaultProps = {
    items        : [],
    draggable    : true,
    selected_item: null
  }

  render() {
    let { items, draggable, selected_item, updateEditorItem } = this.props;

    return (
      <Layer>
        <TransformerComponent
          selected_item={selected_item}
          updateEditorItem={updateEditorItem}
        />
        {items.map(d => (
          <Furniture key={d.id} {...d} draggable={draggable} />
        ))}
      </Layer>
    );
  }
}