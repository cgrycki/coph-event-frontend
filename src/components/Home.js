import React          from 'react';
import { connect }    from 'react-redux';
import { fetchLogin } from '../actions/app.actions';
import { 
  CompoundButton, 
  Spinner, 
  SpinnerSize,
  MessageBar, 
  MessageBarType 
}                     from 'office-ui-fabric-react';
import { 
  error_style, 
  hero_style, 
  hero_sm_style 
}                     from '../constants/styles';


// Component
class Home extends React.Component {
  constructor(props) {
    super();
    this.nextPage   = this.nextPage.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.redirect   = this.redirect.bind(this);
  }

  componentDidMount() {
    /* Kick off login check when the component mounts. */
    this.checkLogin(this.props);
  }

  componentWillReceiveProps(nextProps) {
    /* Updated login status? => Redirect */
    this.redirect(nextProps);
  }
 
  checkLogin(props) {
    /* Make an API call to our server to check if we are authenticated. */
    let { loggedIn, login_loading, login_error, dispatch } = props;

    // If we aren't logged in, and haven't yet recieved a response, dispatch
    // Also, don't make an API call if we have an error
    if ((loggedIn === false) && (login_loading === false) && (login_error === null)) { 
      dispatch(fetchLogin());
    }
  }

  redirect(props) {
    /* Checks login status and redirects to original page if appropriate. */
    let { loggedIn, location, history } = props;

    // Grab the redirect pathname if we were directed from a protected route
    let redirect_from = (location.state && location.state.from) ?
      location.state.from.pathname :
      undefined;

    // Base case, we were redirected from a protected route
    if ((redirect_from !== undefined) && (loggedIn === true)) history.push(redirect_from);
  }

  nextPage() {
    /* Takes user to create event form. */
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

  renderGreeting() {
    /* Renders a greeting depending on the time of day. */
    let hours = (new Date()).getHours();

    // 5am - 12pm: Morning
    if (hours > 5 && hours < 13) return 'Good morning sunshine!';
    // 1pm - 5pm: Afternoon
    else if (hours > 12 && hours < 18) return 'Good afternoon.';
    // 6pm - 10pm: Evening
    else if (hours > 17 && hours < 23) return 'Good evening.';
    // 11pm - 4am
    else return 'Still up?';
  }

  render() {
    let { loggedIn } = this.props;

    return (
      <div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <h1 
              className="ms-slideRightIn40"
              style={hero_style}
            >{this.renderGreeting()}</h1>
            <h1 style={hero_sm_style}>Can we help you with an event?</h1>
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
