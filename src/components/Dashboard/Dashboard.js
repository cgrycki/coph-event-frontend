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
import { populateFormAndPush } from '../../actions/field.actions';


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
    if (this.props.events.length === 0) this.props.getEventsFromServer();
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
              itemCount={this.props.events.length}
            >
              <br/>
              <EventList
                is_admin={this.props.is_admin}
                items={this.props.events}
                loading={this.props.event_loading}
                error={this.props.event_error}
                onView={this.props.populateEventAndPush}
                onEdit={this.props.populateFormAndPush}
                onDelete={this.props.deleteEventFromServer}
              />
            </PivotItem>
            <PivotItem
              key="MySchedule"
              linkText="Schedule"
              itemIcon="CalendarAgenda"
            >
              <br/>
              <DashCalendar
                events={this.props.events}
              />
            </PivotItem>
            {this.state.is_admin && 
              <PivotItem
                key="AdminTools"
                linkText="Administrator Tools"
                itemIcon="Settings"
                
              >
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
  logged_in    : state.app.logged_in,
  is_admin     : state.app.is_admin
});

const mapDispatchToProps = dispatch => ({
  populateEventAndPush: (package_id) => dispatch(populateEventAndPush(package_id)),
  populateFormAndPush  : (info) => dispatch(populateFormAndPush(info)),
  getEventsFromServer  : () => dispatch(getEvents()),
  deleteEventFromServer: (package_id) => dispatch(deleteEvent(package_id)),
  deleteWorkflowEvent  : (package_id) => dispatch(deleteWorkflowEvent(package_id)),
  deleteDynamoEvent    : (package_id) => dispatch(deleteDynamoEvent(package_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);