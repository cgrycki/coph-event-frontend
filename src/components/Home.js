import React          from 'react';
import { connect }    from 'react-redux';
import HeroCard from './common/HeroCard';


// Component
class Home extends React.Component {
  /** Set document title on Mount */
  componentDidMount() {
    document.title = "CPHB Events";
  }

  /** Dispatches a redirect function if applicable. */
  componentWillReceiveProps(nextProps) {
    this.redirect(nextProps);
  }

  /** Redirects to page if auth validated and applicable */
  redirect = (props) => {
    /* Checks login status and redirects to original page if appropriate. */
    const { logged_in, location, history } = props;

    // Grab the redirect pathname if we were directed from a protected route
    let redirect_from = (location.state && location.state.from) ?
      location.state.from.pathname :
      undefined;

    // Base case, we were redirected from a protected route
    if ((redirect_from !== undefined) && (logged_in === true)) history.push(redirect_from);
  }

  /** Takes user to create event form. */
  nextPage = () => this.props.history.push('/form/who');

  /** Renders a greeting depending on the time of day. */
  renderGreeting() {
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

  getActionButtonProps = () => {
    const { logged_in, history } = this.props;
    
    const loggedInProps = {
      iconName: 'AddEvent',
      text: 'Form',
      subtext: 'Create an event at the CoPH',
      onClick: () => history.push('/form/terms'),
      primary: true
    };

    const notLoggedInProps = {
      iconName: 'Lock',
      text: 'Login',
      subtext: 'using your U. Iowa account',
      onClick: () => { window.location.href = process.env.REACT_APP_REDIRECT_URI; },
      primary: true
    };

    return (logged_in) ? loggedInProps : notLoggedInProps;
  }


  render() {
    const { history }   = this.props;
    const clickCalendar = () => history.push('/calendar');
    const clickLayout   = () => history.push('/floorplan');

    return (
      <div className="Home fullHeight">

        <div className="Home--flexRow">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
              <h1 id="Home--Greeting" className="ms-slideRightIn40">{this.renderGreeting()}</h1>
              <h1 id="Home--Subtext">Can we help you with an event?</h1>
            </div>
          </div>
        </div>
        
        <div className="Home--CardsWrapper">
          <div className="Home--Cards">
            <HeroCard text={'Calendar'} subtext={'View room schedules'} iconName={'Calendar'} onClick={clickCalendar} />
            <HeroCard { ...this.getActionButtonProps() } />
            <HeroCard text={'Floorplan Viewer'} subtext={'Plan and visualize your events'} iconName={'Design'} onClick={clickLayout} />
          </div>
        </div>

      </div>
    );
  }
};


// Container
const mapStateToProps = state => ({ 
  logged_in     : state.app.logged_in,
  login_loading: state.app.login_loading,
  login_error  : state.app.login_error
})

export default connect(mapStateToProps)(Home);
