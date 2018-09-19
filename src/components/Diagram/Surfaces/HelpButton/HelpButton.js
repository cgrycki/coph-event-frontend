import React          from 'react';
import { Modal }      from 'office-ui-fabric-react/lib/Modal';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

import AddItemsGIF      from './01-add-items.gif';
import MoveRotateGIF    from './03-move-rotate.gif';
import ApplyLayoutsGIF  from './02-apply-layouts.gif';
import RemoveItemsGIF   from './04-remove-items.gif';


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
          containerClassName="Diagram--HelpModal"
        >
          <div className="ms-Grid-col ms-sm12 ms-md10 ms-mdPush1 Diagram--HelpModal--Title">
            <h1>How to use this tool</h1>
          </div>

          <div className="ms-Grid-col ms-sm12 ms-md10 ms-mdPush1 Diagram--HelpModal--Content">
            <div>
              <p className="ms-fontWeight-semibold">What is it?</p>
              <p>A WYSIWYG (<i>what you see is what you get</i>) floorplan editor. It's intended to make your life easier when planning events at the College of Public Health. You can add, arrange, and save furniture layouts.</p>
            </div>
            <div>
              <p className="ms-fontWeight-semibold">What are Layouts?</p>
              <p>A layout is a collection of furniture items. We have several default layouts you can apply, or you can create your own by adding furniture items to the diagram.</p>
              <p>To apply a layout, select a layout from the <code>Default Layouts</code> dropdown in the <code>Toolbar</code>.</p>
              <img src={ApplyLayoutsGIF} className="ms-borderBase" />
            </div>
            <div>
              <p className="ms-fontWeight-semibold">Adding items</p>
              <p>To add a furniture item, first select the type of furniture you'd like in the <code>Toolbar</code> above the diagram. Then, click in the green area on the floorplan. Furniture items can only be placed within the approved <span className="ms-fontColor--Green">furniture area</span></p>
              <img src={AddItemsGIF} className="ms-borderBase" />
            </div>
            <div>
              <p className="ms-fontWeight-semibold">Moving and Rotating items</p>
              <p>Items can be moved and rotated. To move or rotate an item, first select a furniture item by clicking on it. To move an item, click and hold the mouse button down while dragging to your desired location.</p>
              <p>To rotate an item, use the rotatation anchor attached to the selected item. By clicking and dragging the anchor you can rotate the furniture item in place.</p>
              <img src={MoveRotateGIF} className="ms-borderBase" />
            </div>
            <div>
              <p className="ms-fontWeight-semibold">Removing Items</p>
              <p>To remove an item, first select a furniture item by clicking on it. The item should have a blue outline and a red <code>'X'</code> once it's been selected. Clicking on the red <code>'X'</code> will remove the item from the diagram.</p>
              <img src={RemoveItemsGIF} className="ms-borderBase" />
            </div>
            <div>
              <p className="ms-fontWeight-semibold">Heads Up Display</p>
              <p>We've added a Heads Up Display (<code>HUD</code>) at the bottom left corner to help you keep track of your progress. The <code>HUD</code> contains the current floorplan's furniture item counts <i>and</i> our inventory, so you'll never ask for more than we can give.</p>
              <p>The <code>HUD</code> will update the furniture counts whenever you add an item, remove an item, change the number of chairs per table, or apply a new layout.</p>
            </div>

          </div>

        </Modal>
      </div>
    );
  }
}