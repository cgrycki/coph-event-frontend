/**
 * Event List Component
 */

import React         from 'react';
import { 
  //ShimmeredDetailsList,
  CheckboxVisibility,
  Icon,
  DefaultButton,
  DirectionalHint
}                     from 'office-ui-fabric-react';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { getDateISO } from '../../utils/date.utils';


export default class EventList extends React.Component {
  constructor() {
    super();
    this.createColumns = this.createColumns.bind(this);
  }

  /** Creates columns by binding passed action dispatchers. */
  createColumns() {
    // This is gross and verbose. 
    const { onView, onEdit, onDelete } = this.props;

    const columns = [
      {
        key: 'approved',
        fieldName: 'approved',
        name: 'Approved',
        className: 'Dashboard--approved',
        ariaLabel: '',
        minWidth: 48,
        maxWidth: 48,
        onRender: (item) => {
          const approved = item.approved
          const iconName = approved === 'true' ? 'Approve' : 'Blocked';
          const iconColor = approved !== 'true' ? 'green' : 'red';
          return (<Icon
            title={approved.toString()}
            iconName={iconName}
            style={{ color: iconColor }}
        />)}
      },
      {
        key: 'event_name',
        fieldName: 'event_name',
        name: 'Title',
        arialLabel: 'Title of the event',
        minWidth: 128,
        maxWidth: 300
      },
      {
        key: 'attendance',
        fieldName: 'num_people',
        name: 'Attendance',
        minWidth: 64
      },
      {
        key: 'date',
        fieldName: 'date',
        minWidth: 80,
        onRender: (item) => item.date
      },
      {
        key: 'contact_email',
        fieldName: 'contact_email',
        ariaLabel: 'Event Planner or alternative contact',
        minWidth: 80
      },
      {
        key: 'package_id',
        fieldName: 'package_id',
        name: '',
        className: 'Dashboard--ActionButton',
        ariaLabel: 'Operations for this Event',
        minWidth: 150,
        maxWidth: 200,
        onRender: (item) => {
          return (<DefaultButton
            onClick={() => onView(item.key)}
            text="View event"
            split={true}
            menuProps={{
              useTargetAsMinWidth: true,
              gapSpace: 2,
              directionalHint: DirectionalHint.bottomRightEdge,
              items: [
                {
                  key: 'editEvent',
                  name: 'Edit Event Information',
                  iconProps: { iconName: 'Edit' },
                  disabled: false, // permissions
                  onClick: () => onEdit()
                },
                {
                  key: 'deleteEvent',
                  name: 'Delete Event',
                  iconProps: { iconName: 'RemoveEvent' },
                  disabled: true,
                  onClick: () => onDelete()
                }
              ]
            }}
          />);
        }
      }
    ];

    return columns;
  }

  render() {
    console.log(this.props);
    const loading = this.props.loading || true;
    return (
      <div style={{ display: 'flex', width: '100%' }}>
        <ShimmeredDetailsList
          items={this.props.items}
          columns={this.createColumns()}
          enableSimmer={loading}
          checkboxVisibility={CheckboxVisibility.hidden}
          listProps={{ renderedWindowsAhead: 0, renderedWindowsBehind: 0 }}
        />
      </div>
    );
  }
}


