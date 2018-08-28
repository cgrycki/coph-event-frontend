/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import { Breadcrumb } from 'office-ui-fabric-react';



/* React Component ----------------------------------------------------------*/
/**
 * Renders breadcrumbs for our single page application. By default it disables
 * the current page.
 */
export default class NavPage extends React.PureComponent {
  /**
   * Creates an object for creating a MS Fabric Breadcrumb item.
   * @param {string} key Unique key for breadcrumb. Required by React.
   * @param {string} text Text to display for breadcrumb.
   * @param {boolean} current Indicates if we should disable breadcrumb
   * @param {(string|boolean)} path Route to navigate when breadcrumb `onClick`.
   * @returns {Object} breadcrumb Options for breadcrumb item.
   */
  createProps(key, text, current, path=false) {
    const { history } = this.props;
    const breadcrumb = {
      key          : key,
      text         : text,
      isCurrentItem: current,
      onClick      :  () => history.push(path)
    };
    return breadcrumb;
  }


  getCalendarBreadcrumb() {
    const { history: { location: { pathname }}} = this.props;
    const cal_pg_props = this.createProps('CalCrumb', 'Room Calendar', "/calendar");
    return cal_pg_props;
  }


  /**
   * Returns an object describing the properties of a EventPage breadcrumb.
   * @param {Object} props Properties passed from page calling NavPage.
   * @returns {Object} evt_pg_props
   */
  getEventPageBreadcrumb(package_id) {
    const evt_pg_props = this.createProps('EvtPgCrumb', `Event #${package_id}`, true);
    return evt_pg_props;
  }


  /**
   * Returns an object describing the properties of the Dashboard breadcrumb.
   * @returns {Object} dash_props
   */
  getDashboardBreadcrumb() {
    // Find our current location
    const { history: { location: { pathname }}} = this.props;
    const path      = "/dashboard";
    const currentPg = pathname.startsWith(path);

    // Create the props
    const dash_props = this.createProps('DashCrumb', 'My Dashboard', currentPg, path);
    return dash_props;
  }


  /**
   * Returns an object describing the properties of the Home breadcrumb.
   * @returns {Object} home_props
   */
  getHomeBreadcrumb() {
    // Find our current location
    const { history: { location: { pathname }}} = this.props;
    const path      = "/";
    const currentPg = pathname === path;

    // Create the props
    const home_props = this.createProps('homeCrumb', 'Home', currentPg, path);
    return home_props;
  }


  /**
   * Returns an object describing the properties of the Form breadcrumb.
   * @returns {Object} home_props
   */
  getFormBreadcrumb() {
    const form_props = this.createProps('formCrumb', 'Create an Event', true);
    return form_props;
  }


  /**
   * Higher Order Function creating all of the breadcrumbs given our history
   * and passed props.
   * @param {Object} Properties
   * @returns {Array[Object]} crumbs A list of Breadcrumb prop objects.
   */
  createCrumbs(props) {
    const { history: { location: { pathname }}, package_id } = props;
    
    // By default we should be able to see the home page
    let crumbs = [this.getHomeBreadcrumb()];
    
    // But we rely on our location for any other breadcrumbs...
    // Check if we're on the calendar
    if (pathname === "/calendar") crumbs.push(this.getCalendarBreadcrumb());

    // Check if we're on our dashboard
    if (pathname === "/dashboard") crumbs.push(this.getDashboardBreadcrumb());

    // Check if we're viewing specific event
    if (package_id) {
      crumbs.push(this.getDashboardBreadcrumb());
      crumbs.push(this.getEventPageBreadcrumb(package_id));
    };

    // Check if we're creating an event
    if (pathname.startsWith("/form")) crumbs.push(this.getFormBreadcrumb());

    return crumbs;
  }


  render() {
    return (
      <div className="ms-Grid-row">
        <div 
          className="ms-Grid-col ms-sm12 ms-lg12 ms-xxl12"
          style={{ paddingLeft: 'unset' }}
        >
          <Breadcrumb
            maxDisplayedItems={2}
            items={this.createCrumbs(this.props)}
          />
        </div>
      </div>
    );
  }
}