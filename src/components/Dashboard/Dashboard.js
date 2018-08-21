import React        from 'react';
import { connect }  from 'react-redux';
import NavPage      from '../common/NavPage';
import Popup        from '../common/Popup';
import EventList    from './EventList';
import './Dashboard.css';


// Actions
import { getEvents } from '../../actions/event.actions';
import { populateFormAndPush } from '../../actions/field.actions';
import { deleteEvent } from '../../actions/event.actions';


// Component
class DashboardComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      popupHidden: true,
      popupType: 'edit',
      popupYesClick: () => console.log('clicked!')
    };

    this.hidePopup = this.hidePopup.bind(this);
    this.warnEditPopup = this.warnEditPopup.bind(this);
    this.warnDeletePopup = this.warnDeletePopup.bind(this);
  }

  componentDidMount() {
    /* Fetches event list on load. */
    // Alter web page title
    document.title = "My Events @ CPHB";

    let { dispatch } = this.props;
    dispatch(getEvents());
  }

  hidePopup() {
    this.setState({ popupHidden: true });
  }

  warnEditPopup() {
    this.setState({
      popupHidden: false,
      popupType: 'edit',
      popupYesClick: () => console.log('clicked warning!')
    });
  }

  editEvent(package_id) {
    console.log(package_id);
  }

  warnDeletePopup() {
    this.setState({
      popupHidden: false,
      popupType: 'delete',
      popupYesClick: () => console.log('clicked delete!')
    });
  }

  render() {
    let { events, event_loading, event_error, dispatch, history } = this.props;

    return (
      <div className="ms-Grid-col ms-sm12 Dashboard">

        <NavPage history={history} />

        <h2>My Events</h2>
        
        <div>
          <hr/>
          <br/>
        </div>
       
        <EventList
          events={events}
          
        /> 
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  events       : state.events.events,
  event_loading: state.events.event_loading,
  event_error  : state.events.event_error,
  loggedIn     : state.app.loggedIn,
  isAdmin      : state.app.isAdmin
});

export default connect(mapStateToProps)(DashboardComponent);