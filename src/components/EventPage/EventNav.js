/**
 * Event Navigation bar: breadcrumbs, admin tab
 */

import React          from 'react';
import { Breadcrumb } from 'office-ui-fabric-react';

export default class EventNav extends React.PureComponent {
  renderEventBreadcrumb() {
    /* Renders a disabled breadcrumb for a given event. */
    const { package_id } = this.props;

    return { 
      text: package_id, 
      key: "myEvent", 
      isCurrentItem: true
    };
  }

  renderMyEventsBreadcrumb() {
    /* Renders a redirect breadcrumb to user's dashboard page. */
    const { history } = this.props;

    return {
      text: "My Events",
      key: "myEvents",
      onClick: () => history.push("/dashboard")
    };
  }

  render() {
    return (
      <div className="ms-Grid-row">
        <Breadcrumb
          items={[
            this.renderMyEventsBreadcrumb(),
            this.renderEventBreadcrumb()
          ]}
          maxDisplayedItems={2}
        />
      </div>
    );
  }
}