/* Dependencies -------------------------------------------------------------*/
import React            from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter
}                       from 'office-ui-fabric-react/lib/Dialog';
import {DefaultButton}  from 'office-ui-fabric-react/lib/Button';
import {
  MessageBar,
  MessageBarType
}                     from 'office-ui-fabric-react/lib/MessageBar';
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

  /** Creates a message bar if we have a stateful REST call. */
  popupMessageBar(popupType) {
    // Get the bar text
    const popupMessageBarMessage = messages[popupType].message;
    
    // Get the bar type
    let barType;
    if (popupType === "success")        barType = MessageBarType.success;
    else if (popupType === "submitted") barType = MessageBarType.info;
    else if (popupType === "deleting")  barType = MessageBarType.info;
    else                                barType = MessageBarType.error;

    return (
      <MessageBar messageBarType={barType}>
        {popupMessageBarMessage}
      </MessageBar>
    );
  }

  /** Renders a popup dialog  */
  render() {
    const { popupHidden, popupType, btnClickYes, btnClickNo } = this.props;
    const { title, subText, btnTextYes, btnTextNo } = this.popupMessages(popupType);
    
    return (
      <Dialog
        hidden={popupHidden}
        onDismiss={btnClickNo}
        dialogContentProps={{
          type   : DialogType.largeHeader,
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

        {(popupType === "success" || 
          popupType === "submitted" || 
          popupType === "deleting" ||
          popupType === "error") && this.popupMessageBar(popupType)}

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