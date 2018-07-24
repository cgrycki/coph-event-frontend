// For React
import React from 'react';
import { Fabric } from 'office-ui-fabric-react';

// For Redux
import { connect } from 'react-redux';
import { fetchRooms } from '../actions/room.actions';
import { initialStore } from '../store/initialStore';


// Dumb component
class AppComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: props.loggedIn,
      rooms: props.rooms,
      room_error: props.room_error,
      step: props.step
    }
  }

  componentDidMount() {
    this.propsfetchRooms();
    console.log(this.props);
  }

  render() {
    return (
      <Fabric className="App ms-normalize">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              <h1>TESTING</h1>
            </div>
          </div>
        </div>
      </Fabric>
    );
  }
}


// Smart
const mapStateToProps = state => ({ 
  ...state.appReducer,
  ...state.roomReducer
});

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);