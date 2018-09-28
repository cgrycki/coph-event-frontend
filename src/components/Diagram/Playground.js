import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import Diagram                  from './Diagram';
import Description              from './Description';
import { populateFormAndPush }  from '../../actions/';
import initialStore             from '../../store/initialStore';




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
      <div className="ms-Grid-col ms-sm12 ms-xxl12">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md10 ms-xl8">
            <p>To save your furniture layout, you'll have to {this.getLink()}.</p>
            <Description/>
          </div>
        </div>

        <div className="ms-Grid-row">
          <Diagram draggable={true} />
        </div>
      </div>
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