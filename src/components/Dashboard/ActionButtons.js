/* Dependencies -------------------------------------------------------------*/
import React from 'react';
import {
  DefaultButton,
  DirectionalHint
} from 'office-ui-fabric-react';


/**
 * Component that renders action buttons for an event.
 * - 'Edit', 'Remove/cancel' always (Dashboard, EventPage)
 * - 'View' optionally, changes behavior of action
 */
export default class ActionButtons extends React.PureComponent {
  render() {
    let { 
      permissions, 
      onEdit, 
      onDelete, 
      onView,
      package_id
    } = this.props;

    console.log(this.props);

    return (
      <div className="ActionButtonsDash">
        <DefaultButton
          text="View"
          split={true}
          menuProps={{
            className          : 'ActionButton',
            useTargetAsMinWidth: true,
            gapSpace           : 2,
            directionalHint    : DirectionalHint.bottomRightEdge,
            items              : [
              {
                key      : 'editEvent',
                name     : 'Edit Event Information',
                iconProps: { iconName: 'Edit' },
                disabled : false, // permissions
                onClick  : onEdit
              },
              {
                key      : 'removeEvent',
                name     : 'Cancel Event',
                iconProps: { iconName: 'RemoveEvent' },
                disabled : false, //!permissions.canInitiatorVoid && !permissions.canVoid,
                onClick  : onDelete
              }
            ]
          }}
        />
      </div>
    );
  }
}