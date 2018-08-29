import React from 'react';
import { connect } from 'react-redux';
import NavPage from './common/NavPage';


class About extends React.PureComponent {
  render() {
    return (
      <div className="About">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
            
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
                <NavPage history={this.props.history} />
              </div>
            </div>

            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl12">
                <h1>About Us</h1>
              </div>
            </div>

            <div className="ms-Grid-row">

            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

// Container
export default connect(null, null)(About);
