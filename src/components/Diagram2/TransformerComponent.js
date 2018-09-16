import React, { Component } from 'react';
import { Transformer } from 'react-konva';


export default class TransformerComponent extends Component {
  transformer = React.createRef();

  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  checkNode() {
    if (!this.transformer) return;

    // Get stage and selected so we can search
    const stage             = this.transformer.getStage();
    const dragLayer         = stage.findOne('.dragLayer');
    const { selected_item } = this.props;

    // Sanity check, search only if we have a valid selection
    if (selected_item === null) return this.transformer.detach();
    const selected_node = dragLayer.getChildren()[0];

    if (selected_node === this.transformer.node()) return;
    if (selected_node) this.transformer.attachTo(selected_node);
    else this.transformer.detach();
    
    // Render layer
    this.transformer.getLayer().batchDraw();
  }

  onTransformEnd = () => {
    if (!this.transformer) return;

    // Gather attributes
    const rot                      = this.transformer.rotation();
    const attachedNode             = this.transformer.getNode();
    const { name: furn, id, x, y } = attachedNode.getAttrs();

    // Dispatch update
    const { updateEditorItem } = this.props;
    updateEditorItem({ id, furn, x, y, rot});
  }

  render() {
    return (
      <Transformer
        ref={(node) => { this.transformer = node; }}
        resizeEnabled={false}
        borderEnabled={false}
        rotateAnchorOffset={15}
        onTransformEnd={this.onTransformEnd}
      />
    );
  }
}