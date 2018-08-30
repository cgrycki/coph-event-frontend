/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import NavPage        from '../common/NavPage'
import { ActionButton } from 'office-ui-fabric-react';


const makeButton = (iconName, text, callback, disabled) => (
  <ActionButton
    iconProps={{ iconName: iconName }}
    text={text}
    onClick={() => callback()}
    disabled={disabled}
  />);



/* React Component ----------------------------------------------------------*/
/**
 * Displays an Event Page heading, consisting of PageNav breadcrumbs and action
 * buttons to dispatch events.
 */
export default class EventNav extends React.PureComponent {
  render() {
    let { 
      history, permissions, 
      onEdit, onRemove, onToggle,
      package_id 
    } = this.props;

    // Parse the permissions to set button active or not
    const editDisabled = !permissions.canEdit;
    const cancelDisabled = (!permissions.canInitatorVoid && !permissions.canVoid);

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-lg12 ms-xxl12">

          <NavPage
            history={history}
            package_id={package_id}
          />

          <div className="EventNav">
            <div className="EventNavHeading">
              <h2>Event Details</h2>
            </div>

            <span style={{ float: 'right'}}>
              {makeButton('Edit', "Edit Event", onEdit, editDisabled)}
              {makeButton('removeEvent', "Cancel Event", onRemove, cancelDisabled)}
              {(permissions.signatureId !== null) && 
                makeButton('Settings', 'Workflow Widget', onToggle, false)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}