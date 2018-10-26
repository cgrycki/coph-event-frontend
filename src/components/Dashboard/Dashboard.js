import React        from 'react';
import { connect }  from 'react-redux';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
}                   from 'office-ui-fabric-react/lib/Pivot';
import EventList    from './EventList';
import AdminTools   from './AdminTools';
import DashCalendar from '../Calendar/DashCalendar';
import './Dashboard.css';


// Actions
import { 
  getEvents,
  deleteEvent,
  deleteWorkflowEvent,
  deleteDynamoEvent
}                              from '../../actions/event.actions';
import { 
  clearFormAndPush,
  populateFormAndPush,
  populateDiagramAndPush,
  populateEventAndPush
}                              from '../../actions/nav.actions';


// Component
class DashboardComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tab     : "MyEvents",
      is_admin: props.is_admin
    };
  }

  /** Fetches event list on load and alters web page title */
  componentDidMount() {
    document.title = "My Dashboard";

    // Load events if flag is set and we're not loading
    const { should_fetch, event_loading, getEventsFromServer } = this.props;
    if (should_fetch && !event_loading) getEventsFromServer();
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm12 Dashboard">

        <div className="ms-Grid-row fullHeight">
          <Pivot 
            linkSize={PivotLinkSize.Large}
            linkFormat={PivotLinkFormat.links}
            className="fullHeight">

            <PivotItem
              key="MyEvents"
              linkText="My Events"
              itemIcon="BulletedList"
              itemCount={this.props.events.length}>
              <EventList
                events={this.props.events}
                loading={this.props.event_loading}
                should_fetch={this.props.should_fetch}
                error={this.props.event_error}
                onView={this.props.populateEventAndPush}
                onEdit={this.props.populateFormAndPush}
                onDelete={this.props.deleteEventFromServer}
                onCreate={this.props.clearFormAndPush}
              />
            </PivotItem>

            <PivotItem
              key="MySchedule"
              linkText="My Schedule"
              itemIcon="CalendarAgenda">
              <DashCalendar events={this.props.events} />
            </PivotItem>

            {false && 
              <PivotItem
                key="AdminTools"
                linkText="Administrator Tools"
                itemIcon="Settings">
                <AdminTools
                  workflowCallback={(package_id) => this.props.deleteWorkflowEvent(package_id)}
                  dynamoCallback={(package_id) => this.props.deleteDynamoEvent(package_id)}
                  loading={this.props.event_loading}
                  error={this.props.event_error}
                />
              </PivotItem>}
          </Pivot>
        </div>
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  events       : state.events.events,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error,
  should_fetch : state.events.should_fetch,
  logged_in    : state.app.logged_in,
  is_admin     : state.app.is_admin
});

const mapDispatchToProps = dispatch => ({
  clearFormAndPush      : ()                               => dispatch(clearFormAndPush()),
  populateFormAndPush   : (fields, layout)                 => dispatch(populateFormAndPush(fields, layout)),
  populateDiagramAndPush: (fields, layout)                 => dispatch(populateDiagramAndPush(fields, layout)),
  populateEventAndPush  : ({ event, permissions, layout }) => dispatch(populateEventAndPush({event, permissions, layout})),
  getEventsFromServer   : ()                               => dispatch(getEvents()),
  deleteEventFromServer : (package_id)                     => dispatch(deleteEvent(package_id)),
  deleteWorkflowEvent   : (package_id)                     => dispatch(deleteWorkflowEvent(package_id)),
  deleteDynamoEvent     : (package_id)                     => dispatch(deleteDynamoEvent(package_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);