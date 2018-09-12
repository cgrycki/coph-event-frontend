import React, { Component } from 'react';
import { Label }            from 'office-ui-fabric-react/lib/Label';
import { IconButton }       from 'office-ui-fabric-react/lib/Button';
import { Callout }          from 'office-ui-fabric-react/lib/Callout';


export default class LabelRender extends Component {
  state     = { isOpen: false };
  iconRef   = React.createRef();
  onClick   = () => this.setState({ isOpen: !this.state.isOpen });
  onDismiss = () => this.setState({ isOpen: false });
  
  render() {
    const { isOpen } = this.state;
    const { label, info, required }  = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span><Label required={required}>{label}</Label></span>
        <span ref={(node) => { this.iconRef = node; }}>
          <IconButton
            iconProps={{ iconName: 'Info' }}
            title="More Info"
            ariaLabel="Info"
            onClick={this.onClick}
          />
        </span>
        {isOpen && <Callout
          target={this.iconRef}
          onDismiss={this.onDismiss}
          role={'alertdialog'}
          gapSpace={0}
          calloutMaxWidth={450}
          setInitialFocus={true}>
          <div style={{ padding: '1em' }}>
            <div><p className="ms-fontWeight-semibold">Information</p></div>
            <div style={{ whiteSpace: 'pre-line' }}>{info}</div>
          </div>            
        </Callout>}
      </div>
    );
  }
}