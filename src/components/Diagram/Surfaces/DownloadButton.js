import React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

export default class DownloadButton extends React.Component {
  downloadURI = uri => {
    // Create download object
    const link = document.createElement('a');
    link.download = 'CPHB Event Floorplan';
    link.href = uri;

    // Attach to body and simulate click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onClick = () => {
    const { getStageURI } = this.props;
    const dataURI = getStageURI();
    return this.downloadURI(dataURI);
  }

  render() {
    return (
      <div className="Diagram--Download">
        <ActionButton
          iconProps={{ iconName: 'CloudDownload'}}
          text="Download Floorplan"
          onClick={this.onClick}
        />
      </div>
    );
  }
}