import React from 'react';
import { connect } from 'react-redux';
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

  render() {
    return (
      <div>
        <div>Step One</div>
        <div>
          <button 
            disabled={!this.state.loggedIn}
            onClick={() => this.props.dispatch(updateStep(1))}
          >Next</button>
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
