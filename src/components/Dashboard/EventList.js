/**
 * Event List Component
 */

import React         from 'react';
import { 
  DetailsList,
  CheckboxVisibility,
  Icon,
  DefaultButton,
  DirectionalHint,
  Shimmer, ShimmerElementType as ElemType
}                     from 'office-ui-fabric-react';
import Popup          from '../common/Popup';
import { getDateISO } from '../../utils/date.utils';


export default class EventList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAdmin      : props.isAdmin,
      event        : undefined,
      popupType    : 'edit',
      popupHidden  : true,
      popupYesClick: (item) => this.props.editEvent(item)
    };

    this.createColumns = this.createColumns.bind(this);
    this.hidePopup     = this.hidePopup.bind(this);
    this.renderPopup   = this.renderPopup.bind(this);
  }

  /** Checks incoming props from state => handles popup state. */
  componentWillUpdate(nextProps, prevProps) {
    const { loading, error } = nextProps;
    const { popupType } = this.state;

    // If event deletion request was initiated
    if (loading && popupType === "delete") this.renderPopup('deleting');
    else if (popupType === "deleting" && !loading) {
      // Check for errors, if none than the event was successfully deleted
      if (error) this.renderPopup("error");
      else this.hidePopup();
    };
  }

  /** Creates columns by binding passed action dispatchers. */
  createColumns() {
    // This is gross and verbose. 
    const { onView } = this.props;
    const columns = [
      {
        key: 'approved',
        fieldName: 'approved',
        name: 'Approved',
        className: 'Dashboard--approved',
        ariaLabel: '',
        minWidth: 64,
        maxWidth: 32,
        onRender: (item) => {
          const approved = item.approved
          const iconName = approved === 'true' ? 'Approve' : 'Blocked';
          const iconColor = approved === 'true' ? 'green' : 'red';
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
        minWidth: 64,
        maxWidth: 75
      },
      {
        key: 'date',
        fieldName: 'date',
        name: 'Date',
        minWidth: 80,
        maxWidth: 80,
        onRender: (item) => getDateISO(item.date)
      },
      {
        key: 'contact_email',
        fieldName: 'contact_email',
        name: 'Alt. contact email',
        ariaLabel: 'Event Planner or alternative contact',
        minWidth: 100
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
          item.date = getDateISO(item.date);
          return (<DefaultButton
            onClick={() => onView(item.package_id)}
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
                  onClick: () => this.renderPopup('edit')
                },
                {
                  key: 'deleteEvent',
                  name: 'Delete Event',
                  iconProps: { iconName: 'RemoveEvent' },
                  disabled: true,
                  onClick: () => this.renderPopup('delete')
                }
              ]
            }}
          />);
        }
      }
    ];

    return columns;
  }

  /** Returns a Shimmer component for loading. */
  renderMissingItem(idx, props) {
    return (<Shimmer /> );
  }
  
  /* Alters component state, and hides the popup after a rerender. */
  hidePopup() { 
    this.setState({ popupHidden: true }); 
  }

  /** Sets the popup to visible and maps a dispatched action from props to popup callback. */
  renderPopup(popupType) {
    // Gather dispatch functions from react-redux's connect
    const { onEdit, onDelete } = this.props;

    // Get the currently selected event and parse it's date
    let { event } = this.state;
    event.date = getDateISO(event.date);

    // Create a mapping of 'state' => function
    const clickCallback = {
      edit    : () => onEdit(event),
      delete  : () => onDelete(event),
      deleting: () => console.log("Patience... I've sent the delete request to the server"),
      error   : () => this.hidePopup()
    };

    this.setState({
      popupHidden  : false,
      popupType    : popupType,
      popupYesClick: clickCallback[popupType]
    });
  }
  

  render() {
    const loading = this.props.loading || true;

    return (
      <div className="Dashboard--EventsList">
        <DetailsList
          items={this.props.items}
          columns={this.createColumns()}
          onActiveItemChanged={(item) => this.setState({ event: item })}
          //enableSimmer={loading}
          //onRenderMissingItem={(index, rowProps) => this.renderMissingItem(index, rowProps)}
          checkboxVisibility={CheckboxVisibility.hidden}
          listProps={{ renderedWindowsAhead: 0, renderedWindowsBehind: 0 }}
          style={{ display: 'flex', width: '100%' }}
          width={'100%'}
        />

        <Popup
          popupType={this.state.popupType}
          popupHidden={this.state.popupHidden}
          btnClickYes={() => this.state.popupYesClick()}
          btnClickNo={() => this.hidePopup()}
        />
      </div>
    );
  }
}


