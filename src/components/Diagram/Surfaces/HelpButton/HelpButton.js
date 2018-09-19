import React          from 'react';
import { Modal,   }      from 'office-ui-fabric-react/lib/Modal';
import { IconButton } from 'office-ui-fabric-react/lib/Button';


export default class HelpButton extends React.Component {
  state = {
    modalOpen: false
  }

  openModal = () => this.setState({ modalOpen: true });
  hideModal = () => this.setState({ modalOpen: false });

  render() {
    return (
      <div>
        <IconButton
          iconProps={{
            iconName: 'Help',
            ariaLabel: 'Open Help Dialog'
          }}
          title="Help Dialog"
          onClick={this.openModal}
        />
        <Modal
          isOpen={this.state.modalOpen}
          onDismiss={this.hideModal}
          isBlocking={false}
          containerClassName="Diagram--HelpModal">
          <div>
            <div className="Diagram--HelpModal--Title">
              <h2>How to use this tool</h2>
            </div>

            <div className="Diagram--HelpModal--Content">
              <p><span className="ms-fontWeight-semibold">What is it?</span></p>
              <p><span className="ms-fontWeight-semibold">Layouts</span></p>
              <p><span className="ms-fontWeight-semibold">Adding items</span></p>
              <p><span className="ms-fontWeight-semibold">Moving & Rotating items</span></p>
              <p><span className="ms-fontWeight-semibold">Removing Items</span></p>
              <p><span className="ms-fontWeight-semibold">Heads Up Display</span></p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}