import React from 'react';
import { connect } from 'react-redux';

// Actions
import { getEvents } from '../../actions/event.actions';


// Component
class DashboardComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  componentDidMount() {
    /* Fetches event list on load. */
    let { dispatch } = this.props;
    dispatch(getEvents());
  }

  componentWillReceiveProps(nextProps) {
    console.log('old', this.props);
    console.log('new', nextProps);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Admin Page</h3>
      </div>
    );
  }
}


// Container
const mapStateToProps = state => ({
  events: state.events.events,
  loggedIn: state.app.loggedIn,
  isAdmin: state.app.isAdmin
})
export default connect(mapStateToProps)(DashboardComponent);