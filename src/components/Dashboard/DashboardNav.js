import React from 'react';
import NavPage from '../common/NavPage';
import { 
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from 'office-ui-fabric-react';


export default class DashboardNav extends React.Component {
  constructor(props) {
    super();
    this.state = { is_admin: props.is_admin };
  }

  //renderAdminTab() {}
  
  render() {
    console.log(this.props, this.state);

    return (
      <div className="ms-Grid-row DashboardNav">
        <NavPage history={this.props.history} />
        <h2>My Events</h2>
      </div>
    );
  }
}