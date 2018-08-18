// Dependencies
import React          from 'react';
import { connect }    from 'react-redux';
import { 
  ActionButton,
  DefaultButton
} from 'office-ui-fabric-react';

import EventNav       from './EventNav';
import EventDetails   from './EventDetails';
import WorkflowWidget from './WorkflowWidget';
import './EventPage.css';

// Actions
import { getEvent }   from '../../actions/event.actions';
import { populateFieldInfo }         from '../../actions/field.actions';


// Component
class EventPageComponent extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    /* Fetches our event information on mount. */
    const { 
      match: { params: { package_id }},
      dispatch
    } = this.props;
    
    // Execute our call to get single event data
    dispatch(getEvent(package_id));
  }

  componentWillUpdate(nextProps) {
    /* Updates web page title when we recieve data from the REST call. */
    let { event: { event_name }} = nextProps;
    if (event_name) document.title = `Event: ${event_name}`;
  }

  renderEditButton() {
    /* Conditionally renders a edit button */
    const { permissions, dispatch, event } = this.props;

    return (
      <ActionButton
        iconProps={{ iconName: 'Edit' }}
        disabled={permissions.canEdit}
        onClick={() => dispatch(populateFieldInfo(event))}
      >
        Edit Event
      </ActionButton>
    );
  }

  renderRemoveButton() {
    /* Conditionally renders a cancel button */
    const { permissions, dispatch, event } = this.props;

    return (
      <ActionButton
        iconProps={{ iconName: 'RemoveEvent' }}
        disabled={permissions.canInitiatorVoid || permissions.canVoid}
      >
        Cancel Event
      </ActionButton>
    );
  }

  renderActionButton() {
    let { dispatch, permissions, event } = this.props;

    return (
      <DefaultButton
        text="Actions"
        split={true}
        menuProps={{
          items: [
            {
              key: 'editEvent',
              name: 'Edit Event Information',
              iconProps: { iconName: 'Edit' },
              disabled: permissions.canEdit
            },
            {
              key: 'removeEvent',
              name: 'Cancel Event',
              iconProps: { iconName: 'RemoveEvent' },
              disabled: !permissions.canInitiatorVoid && !permissions.canVoid
            }
          ]
        }}
      />
    );
  }

  render() {
    const { 
      match: { params: { package_id, signature_id }},
      history,
      event
    } = this.props;

    return (
      <div className="ms-Grid-col ms-sm12 EventPage">
        <EventNav
          package_id={package_id}
          history={history}
        />

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm9 ms-lg9 ms-xxl9">
            <h2 >Event Details</h2>
          </div>
          <div className="ms-Grid-col ms-sm3 ms-lg3 ms-xxl3">
            <span style={{ float: 'right' }} className="ms-clearfix">
              {this.renderActionButton()}
            </span>
          </div>
        </div>

        <div>
          <hr/>
          <br/>
        </div>
        
        <EventDetails event={event} />

        {signature_id &&
          <WorkflowWidget
            package_id={package_id}
            signature_id={signature_id}
          />}
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  event        : state.events.event,
  permissions  : state.events.permissions,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error
});


export default connect(mapStateToProps)(EventPageComponent);