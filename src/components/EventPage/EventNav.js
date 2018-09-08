/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
}                   from 'office-ui-fabric-react/lib/Pivot';


const makeButton = (iconName, text, callback, disabled) => (
  <ActionButton
    iconProps={{ iconName: iconName }}
    text={text}
    onClick={() => callback()}
    disabled={disabled}
  />);

const makePivot = (key, text, icon) => (
  <PivotItem key={key} linkText={text} iconName={icon} />
);




/* React Component ----------------------------------------------------------*/
/**
 * Displays an Event Page heading, consisting of PageNav breadcrumbs and action
 * buttons to dispatch events.
 */
export default class EventNav extends React.Component {

  getPivotArray = () => {
    let pivotArray = [makePivot("Form", "Event Details", "TextDocument")];
    
    if (this.props.showLayout) 
      pivotArray.push(makePivot("Layout", "Layout", "PivotChart"));

    pivotArray.push(makePivot("Workflow", "Workflow Widget", "Settings"));

    return pivotArray;
  }


  render() {
    let {
      onEdit, onRemove, permissions,  // For action buttons
      selectedPivot, onToggle         // For pivot
    } = this.props;

    // Parse the permissions to set button active or not
    const editDisabled = !permissions.canEdit;
    const cancelDisabled = (!permissions.canInitatorVoid && !permissions.canVoid);

    // Get a list of pivot items
    const pivotArray = this.getPivotArray();

    return (
      <div className="ms-Grid-row EventNav">
        <div className="ms-Grid-col ms-sm12 ms-lg12 ms-xxl12">

            <span style={{display: 'inline-block'}}>
              <Pivot
                linkSize={PivotLinkSize.large}
                linkFormat={PivotLinkFormat.links}
                selectedKey={selectedPivot}
                onLinkClick={onToggle}
                headersOnly
              >
                {pivotArray}
              </Pivot>
            </span>

            <span style={{ float: 'right'}}>
              {makeButton('Edit', "Edit Event", onEdit, editDisabled)}
              {makeButton('removeEvent', "Cancel Event", onRemove, cancelDisabled)}
            </span>
          

        </div>
      </div>
    );
  }
}