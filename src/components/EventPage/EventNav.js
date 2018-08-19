/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import NavPage        from '../common/NavPage'
import ActionButtons  from './ActionButtons';


/* React Component ----------------------------------------------------------*/
/**
 * Displays an Event Page heading, consisting of PageNav breadcrumbs and action
 * buttons to dispatch events.
 */
export default class EventNav extends React.PureComponent {
  render() {
    let { history, permissions, onEdit, onRemove, package_id } = this.props;

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-lg12 ms-xxl12">

          <NavPage
            history={history}
            package_id={package_id}
          />

          <div className="EventNav">
            <div className="EventNavHeading">
              <h2>Event Details</h2>
            </div>

            <div className="EventNavActions">
              <ActionButtons
                permissions={permissions}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}