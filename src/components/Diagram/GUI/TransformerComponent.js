import React, { Component } from 'react';
import { Transformer } from 'react-konva';


export default class TransformerComponent extends Component {
  transformer = React.createRef();

  componentDidMount() {
    this.checkNode();
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    return this.props.selected_item !== nextProps.selected_item;
  }*/

  componentDidUpdate() {
    this.checkNode();
  }

  checkNode() {
    if (!this.transformer) return;

    // Get stage and selected so we can search
    const stage             = this.transformer.getStage();
    const { selected_item } = this.props;

    // Sanity check, search only if we have a valid selection
    if (selected_item === null) return this.transformer.detach();
    const selected_node = stage.findOne('#' + selected_item);

    // ATTACH TO FURN ITEM INSTEAD OF GROUP
    //const selected_node  = selected_group.findOne('.furnItem');
    //const furn_item = selected_node.findOne('.furnItem');
    //console.log(this.transformer.boundBoxFunc(), furn_item);
    //console.log(this.props, stage, selected_item, selected_node);
    
    if (selected_node === this.transformer.node()) return;
    if (selected_node) this.transformer.attachTo(selected_node);
    else this.transformer.detach();
    
    // Render layer
    this.transformer.getLayer().batchDraw();
  }

  render() {
    return (
      <Transformer
        ref={(node) => { this.transformer = node; }}
        resizeEnabled={false}
        borderEnabled={false}
        rotateAnchorOffset={15}
      />
    );
  }
}