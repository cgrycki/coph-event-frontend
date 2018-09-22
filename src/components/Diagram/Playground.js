import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { HelpButton }           from './Surfaces';
import Diagram                  from './Diagram';
import { populateFormAndPush }  from '../../actions/';
import initialStore             from '../../store/initialStore';


// Functional components
const indicator = 
  (<svg 
    style={{overflow: 'visible', margin: '0 0.2rem'}}
    width="1.2em"
    height="1.2em"
    fill="#a1d99b"
    fillOpacity="1"
    stroke="#006d2c"
    strokeWidth="1"
    strokeDasharray="5,2">
    <rect x={0} y={0} width='100%' height='100%' />
  </svg>
);
const pointer = <span style={{fontSize: '1.2rem', lineHeight: '1.2' }}>👉</span>


// React Component
class Playground extends Component {

  getLoginLink = () => {
    return (
      <a
        href={process.env.REACT_APP_REDIRECT_URI}
        title="Login with your U. Iowa account">
        login
      </a>
    );
  }
  
  getFormLink = () => {
    const { items, populateFormAndPush } = this.props;
    return (
      <React.Fragment>
        complete an <a
        style={{textDecoration: 'underline'}}
        onClick={() => populateFormAndPush(items)}
        title="Create a new Event">Event Request Form</a>
      </React.Fragment>
    );
  }

  getLink = () => {
    const { logged_in } = this.props;
    return (logged_in) ? this.getFormLink() : this.getLoginLink();
  }

  render() {
    return (
      <React.Fragment>

        <div className="ms-Grid-row Diagram--Instructions">
          <div className="ms-Grid-col ms-sm9 ms-xl7">
            <h1>First Floor Floorplan</h1>
            <p>To save your furniture layout, you'll have to {this.getLink()}.</p>
            <p>Place furniture items and visualize your event by clicking in the {indicator} polygon. You can move and rotate furniture by clicking and dragging. For more instructions, click the help button to the right. {pointer}</p>
          </div>

          <div className="ms-Grid-col ms-sm3">
            <span style={{ float: 'right'}}>
              <HelpButton />
            </span>
          </div>
        </div>

        <div className="ms-Grid-row">
          <Diagram draggable={true} />
        </div>

      </React.Fragment>
    );
  }
}


// Redux Container
const mapStateToProps = state => ({
  logged_in: state.app.logged_in,
  items: state.diagram.items
})
const mapDispatchToProps = dispatch => ({
  populateFormAndPush: items => dispatch(populateFormAndPush(initialStore.form.fields, items))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playground);