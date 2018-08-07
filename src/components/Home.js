import React         from 'react';
import { connect }   from 'react-redux';
import { 
  CompoundButton, 
  Spinner, 
  SpinnerSize,
  MessageBar, 
  MessageBarType 
}                     from 'office-ui-fabric-react';
import { fetchLogin } from '../actions/app.actions';


// Component
class Home extends React.Component {
  constructor(props) {
    super();
    this.nextPage = this.nextPage.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidMount() {
    // Kick off login check when the component mounts
    this.checkLogin(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkLogin(nextProps);
  }
 
  checkLogin(props) {
    // Make an API call to our server to check if we are authenticated.
    let { loggedIn, login_loading, login_error, dispatch, history } = props;

    // Grab the redirect pathname if we were directed from a protected route
    let redirect_from = ((props.location.state) && (props.location.state.from)) ?
      props.location.state.from.pathname :
      undefined;

    // Base case, we were redirected from a protected route
    if ((redirect_from !== undefined) && (loggedIn === true)) history.push(redirect_from);

    // Authenticated from Workflow login case, if we're logged in then advance to the next page
    else if ((redirect_from === undefined) && (loggedIn === true)) this.nextPage();

    // If we aren't logged in, and haven't yet recieved a response, dispatch
    // Also, don't make an API call if we have an error
    else if ((loggedIn === false) && (login_loading === false) && (login_error === null)) { 
      dispatch(fetchLogin());
    }
  }

  nextPage() {
    this.props.history.push('/form/user');
  }

  renderLoad() {
    return (
      <Spinner
        size={SpinnerSize.large}
        label={"Checking login status..."}
        className={"ms-textAlignCenter"}
      />
    );
  }

  renderError(error) {
    const error_style = {
      "color"     : "#a80000",
      "fontFamily": "Segoe UI"
    };

    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        dismissButtonAriaLabel="Close"
      >
        <p className="ms-textAlignCenter">Warning! There was an error while authenticating your login.</p>
        <p className="ms-textAlignCenter" style={error_style}>{error}</p>
      </MessageBar>
    );

  }

  renderStatus() {
    let { login_loading, login_error } = this.props;

    const status_style = {
      "minHeight" : "250px",
      "display"   : "flex",
      "alignItems": "center"
    };

    return (
      <div className="ms-Grid-row">
        <div 
          className="ms-Grid-col ms-sm8 ms-smPush2 ms-textAlignCenter ms-slideDownIn200"
          style={status_style}
        >
          <div style={{"margin": "auto"}}>
            { // If we have an error, on render the error. Otherwise render loading
              (login_error) ? 
                login_error && this.renderError(login_error) :
                login_loading && this.renderLoad()
            }
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { loggedIn } = this.props;

    console.log(this.props);

    return (
      <div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <h1 className="ms-fontSize-su">Events @ College of Public Health</h1>
          </div>
        </div>

        {this.renderStatus()}

        <hr/>
        <br/>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">

            <div style={{"display": "flex", "justifyContent": "space-between", marginTop: "15px"}}>

              <div style={{float: 'left'}}>
                <CompoundButton
                  primary={true}
                  secondaryText="with your Iowa account."
                  disabled={loggedIn}
                  text={"Login"}
                  title="Login to your University of Iowa account."
                  href={`${process.env.REACT_APP_REDIRECT_URI}/auth`}
                />
              </div>
              <div style={{float: 'right'}}>
                <CompoundButton
                  primary={true}
                  text={"Create an Event"}
                  disabled={!loggedIn}
                  onClick={() => this.nextPage()}
                />
              </div>
            </div>

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

export default connect(mapStateToProps)(Home);
