/**
 * Event List Component
 */
import React         from 'react';
import { 
  CheckboxVisibility,
  Icon,
  DefaultButton,
  DirectionalHint
}                     from 'office-ui-fabric-react';
import {ShimmeredDetailsList} from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import Popup          from '../common/Popup';
import { getDateISO } from '../../utils/date.utils';


export default class EventList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      event        : undefined,
      permissions  : undefined,
      layout       : undefined,
      popupType    : 'edit',
      popupHidden  : true,
      popupYesClick: (item) => props.editEvent(item)
    };

    this.renderPopup   = this.renderPopup.bind(this);
  }

  /** Checks incoming props and compares against previous props/state to hide popup */
  componentWillReceiveProps(nextProps) {
    const { loading: currentLoading,                     } = this.props;
    const { loading: nextLoading,    error: nextError }    = nextProps;
    const { popupType } = this.state;

    // If we clicked edit we would be pushed to the form
    // So if we initiated DELETE, we would have popupType=delete and currentLoading false
    if (popupType === 'delete' && !currentLoading && nextLoading) {
      this.renderPopup('deleting');
    }
    // If we updated DELETE to deleting and we aren't loading then the request completed
    else if (popupType === 'deleting' && currentLoading && !nextLoading) {
      // Check for errors in result
      if (nextError) this.renderPopup('error');
      // Otherwise we successfully deleted event
      else {
        this.renderPopup('deleted');
        setTimeout(this.hidePopup(), 1000);
      };
    }
  }

  /** Creates columns by binding passed action dispatchers. */
  createColumns = () => {
    // This is gross and verbose. 
    const { onView } = this.props;
    const nameMap = {
      true : 'EventAccepted',
      false: 'EventTentative',
      void : 'EventDeclined'
    };
    const colorMap = {
      true : '#107c10',
      false: '#a6a6a6',
      void : '#e81123'
    }
    const columns = [
      {
        key: 'approved',
        name: 'Approved',
        className: 'Dashboard--approved',
        ariaLabel: '',
        minWidth: 64,
        maxWidth: 64,
        onRender: (item) => {
          const approved = item.event.approved;
          const iconName  = nameMap[approved];
          const iconColor = colorMap[approved];

          return (<Icon
            title={`Event Approved: ${approved.toString()}`}
            iconName={iconName}
            style={{ 
              color      : iconColor,
              fontSize   : '18px',
              marginRight: '2em',
              float      : 'right'
            }}
        />)}
      },
      {
        key: 'layout',
        name: 'Layout',
        ariaLabel: 'Event has a furniture layout',
        minWidth: 64,
        maxWidth: 64,
        onRender: item => {
          const hasFurniture = item.layout.items.length > 0;

          return ((hasFurniture) ?
            <Icon
              iconName="CheckMark"
              style={{fontSize: '18px', marginRight: '2em', float: 'right'}}
            /> : <span></span> 
          );
        }
      },
      {
        key: 'event_name',
        name: 'Title',
        arialLabel: 'Title of the event',
        minWidth: 128,
        maxWidth: 300,
        onRender: (item) => item.event.event_name
      },
      {
        key: 'attendance',
        name: 'Attendance',
        minWidth: 62,
        maxWidth: 62,
        onRender: (item) => <span style={{float: 'right'}}>{item.event.num_people}</span>
      },
      {
        key: 'date',
        name: 'Date',
        minWidth: 80,
        maxWidth: 80,
        onRender: (item) => getDateISO(item.event.date)
      },
      {
        key: 'contact_email',
        name: 'Alt. contact email',
        ariaLabel: 'Event Planner or alternative contact',
        minWidth: 100,
        onRender: (item) => item.event.contact_email
      },
      {
        key: 'package_id',
        name: '',
        className: 'Dashboard--ActionButton',
        ariaLabel: 'Operations for this Event',
        minWidth: 150,
        maxWidth: 200,
        onRender: (item) => {
          item.date = getDateISO(item.event.date);
          return (<DefaultButton
            onClick={() => onView(item)}
            text="View event"
            split={true}
            primary
            menuProps={{
              useTargetAsMinWidth: true,
              gapSpace: 2,
              directionalHint: DirectionalHint.bottomRightEdge,
              items: [
                {
                  key: 'editEvent',
                  name: 'Edit Event Information',
                  iconProps: { iconName: 'Edit' },
                  disabled: !item.permissions.canEdit,
                  onClick: () => this.renderPopup('edit')
                },
                {
                  key: 'deleteEvent',
                  name: 'Delete Event',
                  iconProps: { iconName: 'RemoveEvent' },
                  disabled: (!item.permissions.canInitiatorVoid || !item.permissions.canVoid),
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
  
  /* Alters component state, and hides the popup after a rerender. */
  hidePopup = () => { 
    this.setState({ popupHidden: true }); 
  }

  /** Sets the popup to visible and maps a dispatched action from props to popup callback. */
  renderPopup(popupType) {
    // Gather dispatch functions from react-redux's connect
    const { onEdit, onDelete } = this.props;

    // Get the currently selected event and parse it's date
    const { event, layout } = this.state;
    event.date = getDateISO(event.date);

    // Create a mapping of 'state' => function
    const clickCallback = {
      edit    : () => onEdit(event, layout),
      delete  : () => onDelete(event.package_id),
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
    // Only show disabled rows if we're loading events from API
    const should_shimmer = (this.props.loading && this.props.should_fetch);

    return (
      <div className="Dashboard--EventList">
        <ShimmeredDetailsList
          items={this.props.events}
          columns={this.createColumns()}
          onActiveItemChanged={(item) => this.setState({ 
            event      : item.event,
            permissions: item.permissions,
            layout     : item.layout
          })}
          enableShimmer={should_shimmer}
          checkboxVisibility={CheckboxVisibility.hidden}
          shimmerLines={10}
          style={{ display: 'flex', width: '100%' }}
        />
        
        <div className='Dashboard--CreateButton'>
          <DefaultButton
            iconProps={{ iconName: 'AddEvent', iconColor: '#333'}}
            primary={true}
            onClick={() => this.props.onCreate()}
          >
            Create Event
          </DefaultButton>
        </div>

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


