import React from 'react';
import { connect } from 'react-redux';
import { CompoundButton } from 'office-ui-fabric-react';
import { fetchLogin, updateStep } from '../../../actions/app.actions';

// Component
class StepOneComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };
  }

  componentDidMount() {
    this.props.dispatch(fetchLogin());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn === true) this.nextPage();
    else this.setState({ ...nextProps });
  }

  redirectLogin() {
    alert('Should be redirecting once we have our backend up!');
  }

  nextPage() {
    this.props.history.push('/form/user');
  }

  render() {
    return (
      <div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <p className="ms-fontSize-xl"></p>
          </div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <p>This is an example text....</p>
          </div>
        </div> 

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm3 ms-smPush1">
            <CompoundButton
              primary={true}
              secondaryText="with your Iowa account."
              disabled={this.props.loggedIn}
              onClick={() => this.redirectLogin()}
            >Login</CompoundButton>
          </div>

          <div className="ms-Grid-col ms-sm3 ms-smPush5">
            <CompoundButton
              primary={true}
              secondaryText="Login to create event."
              disabled={this.props.loggedIn}
              onClick={() => this.nextPage()}
            >Create</CompoundButton>
          </div>
        </div>

      </div>
    );
  }
};


// Container
const mapStateToProps = state => ({ 
  loggedIn     : state.app.loggedIn,
  login_loading: state.app.login_loading,
  login_error  : state.app.login_error
})

export default connect(mapStateToProps)(StepOneComponent);
