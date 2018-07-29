import React from 'react';
import { connect } from 'react-redux';
import { 
  CompoundButton, Spinner, SpinnerSize,
  MessageBar, MessageBarType 
} from 'office-ui-fabric-react';
import { fetchLogin } from '../actions/app.actions';


// Component
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchLogin());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn === true) this.nextPage();
    else this.setState({ ...nextProps });
  }

  nextPage() {
    this.props.history.push('/form/user');
  }

  renderLoad() {
    return (
      <Spinner
        size={SpinnerSize.large}
        label={"Checking login status..."}
      />
    );
  }

  renderError(error) {
    const error_style = {
      "color": "#a80000",
      "fontFamily": "Segoe UI"
    };

    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        onDismiss={console.log('test')}
        dismissButtonAriaLabel="Close"
      >
        <p className="ms-textAlignCenter">Warning! There was an error while authenticating your login.</p>
        <p className="ms-textAlignCenter">{error}</p>
      </MessageBar>
    );

  }

  renderLoginLoadError() {
    let { login_loading, login_error } = this.props;

    const status_style = {
      "minHeight": "250px",
      "display": "flex",
      "alignItems": "center"
    };

    return (
      <div className="ms-Grid-row">
        <div 
          className="ms-Grid-col ms-sm6 ms-smPush3 ms-textAlignCenter ms-slideDownIn200"
          style={status_style}
        >
          {(login_loading) ? this.renderLoad() : this.renderError(login_error)}
        </div>
      </div>
    );
  }

  render() {
    let { loggedIn, login_error, login_loading } = this.state;
    //, 'marginLeft': 'auto', 'float': 'right'
    return (
    <div>

      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <h1 className="ms-fontSize-su">Events @ College of Public Health</h1>
        </div>
      </div>

      {this.renderLoginLoadError()}

      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm10 ms-smPush1">

          <div style={{"display": "flex", "justifyContent": "space-around", "marginTop": "15px"}} />
            <div style={{'display': 'inline'}}>
              <CompoundButton
                primary={true}
                secondaryText="with your Iowa account."
                disabled={loggedIn}
                text={"Login"}
                title="Login to your University of Iowa account."
                href={`${process.env.REACT_APP_REDIRECT_URI}`}
                target="_blank"
              />
            </div>
            <div style={{'display': 'inline', 'float': 'right'}}>
              <CompoundButton
                primary={true}
                text={"Create an Event"}
                secondaryText="Login to create event."
                disabled={loggedIn}
                onClick={() => this.nextPage()}
              />
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
