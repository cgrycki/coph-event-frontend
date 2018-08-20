/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  DefaultButton,
  MessageBar,
  MessageBarType
}                     from 'office-ui-fabric-react';
import messages       from './messages';
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
  /** Returns the dialog popup textual messages depending on poopupType. */
  popupMessages(popupType) {
    return { ...messages[popupType] };
  }

  popupMessageBar(popupType) {
    let popupMessageBarType, popupMessageBarMessage;
    
    if (popupType === "success") {
      popupMessageBarType    = MessageBarType.success;
      popupMessageBarMessage = messages[popupType].message;
    }
    else if (popupType === "submitted") {
      popupMessageBarType    = MessageBarType.info;
      popupMessageBarMessage = messages[popupType].message;
    }

    return (
      <MessageBar messageBarType={popupMessageBarType}>
        {popupMessageBarMessage}
      </MessageBar>
    );
  }

  render() {
    const { popupHidden, popupType, btnClickYes, btnClickNo } = this.props;
    const { title, subText, btnTextYes, btnTextNo } = this.popupMessages(popupType);
    
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

        {(popupType === "success" || popupType === "submitted") 
          && this.popupMessageBar(popupType)}

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