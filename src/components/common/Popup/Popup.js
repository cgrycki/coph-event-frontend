/* Dependencies -------------------------------------------------------------*/
import React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  DefaultButton
}             from 'office-ui-fabric-react';
import './Popup.css';


/* React Component ----------------------------------------------------------*/
/**
 * Popup that asks for confirmation from user to complete an action.
 * Major Props
 *  - isVisible: boolean showing/hiding
 *  - Title
 *  - Subtitle
 *  - Yes button text
 *  - Yes button onClick: dispatches an action
 *  - No button text
 *  - No button onClick: closes the modal by setting it's parent state
 */
export default class Popup extends React.Component {
  render() {
    let { 
      popupHidden, title, subText,
      btnTextYes, btnClickYes,
      btnTextNo, btnClickNo
    } = this.props;

    return (
      <Dialog
        hidden={popupHidden}
        onDismiss={btnClickNo}
        dialogContentProps={{
          type   : DialogType.normal,
          title  : title,
          subText: subText
        }}
        modalProps={{
          isBlocking        : false,
          isDarkOverlay     : true,
          containerClassName: 'ms-dialogMainOverride',
        }}
      >
        <br/>
        <DialogFooter>
          <DefaultButton
            primary={true}
            text={btnTextYes}
            onClick={btnClickYes}
            style={{ float: 'left' }}
          />
          <DefaultButton
            text={btnTextNo}
            onClick={btnClickNo}
          />
        </DialogFooter>

      </Dialog>
    );
  }
}