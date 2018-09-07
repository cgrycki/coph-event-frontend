import React        from 'react';
import { connect }  from 'react-redux';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
}                   from 'office-ui-fabric-react';
import NavPage      from '../common/NavPage';
import EventList    from './EventList';
import AdminTools   from './AdminTools';
import DashCalendar from '../Calendar/DashCalendar';
import './Dashboard.css';


// Actions
import { 
  getEvents,
  deleteEvent,
  deleteWorkflowEvent,
  deleteDynamoEvent,
  populateEventAndPush
}                              from '../../actions/event.actions';
import { populateFormAndPush } from '../../actions/form.actions';


// Component
class DashboardComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tab: "MyEvents",
      is_admin: props.is_admin
    };
  }

  /** Fetches event list on load and alters web page title */
  componentDidMount() {
    document.title = "My Dashboard";
    if (this.props.should_fetch) this.props.getEventsFromServer();
  }

  render() {
    return (
      <div className="ms-Grid-col ms-sm12 Dashboard">
      
        <div className="ms-Grid-row">
          <NavPage history={this.props.history} />
        </div>
        
        <br/>

        <div className="ms-Grid-row">
          <Pivot linkSize={PivotLinkSize.Large} linkFormat={PivotLinkFormat.links}>
            <PivotItem
              key="MyEvents"
              linkText="My Events"
              itemIcon="BulletedList"
              itemCount={this.props.events.length}>
              <br/>
              <EventList
                events={this.props.events}
                loading={this.props.event_loading}
                should_fetch={this.props.should_fetch}
                error={this.props.event_error}
                onView={this.props.populateEventAndPush}
                onEdit={this.props.populateFormAndPush}
                onDelete={this.props.deleteEventFromServer}
              />
            </PivotItem>
            <PivotItem
              key="MySchedule"
              linkText="My Schedule"
              itemIcon="CalendarAgenda">
              <br/>
              <DashCalendar
                events={this.props.events}
              />
            </PivotItem>
            {this.state.is_admin && 
              <PivotItem
                key="AdminTools"
                linkText="Administrator Tools"
                itemIcon="Settings">
                <br/>
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
  populateEventAndPush : ({event, permissions, items}) => dispatch(populateEventAndPush({event, permissions, items})),
  populateFormAndPush  : (fields, items) => dispatch(populateFormAndPush(fields, items)),
  getEventsFromServer  : () => dispatch(getEvents()),
  deleteEventFromServer: (package_id) => dispatch(deleteEvent(package_id)),
  deleteWorkflowEvent  : (package_id) => dispatch(deleteWorkflowEvent(package_id)),
  deleteDynamoEvent    : (package_id) => dispatch(deleteDynamoEvent(package_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);