import React from 'react';
import { connect } from 'react-redux';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import scaleToFloorplan from '../../utils/scaleToFloorplan';


class LayoutSerialize extends React.Component {
  logScaledItems = () => {
    const { items, width, height } = this.props;
    const dimensions = { width, height };

    const trueScaleItems = scaleToFloorplan(items, dimensions);
    console.log(trueScaleItems);
  }

  render() {
    return (<DefaultButton
      text="Log scaled items"
      onClick={this.logScaledItems}
    />);
  }
}


const mapStateToProps = state => ({
  items: state.diagram.items,
  width: state.diagram.layout.width,
  height: state.diagram.layout.height
})

export default connect(mapStateToProps)(LayoutSerialize);