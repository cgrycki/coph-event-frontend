/* Dependencies -------------------------------------------------------------*/
import React          from 'react';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import './NavPage.css';


const styles = {
  itemLink: {
    maxWidth: 'unset',
    paddingLeft: 'unset',
    paddingRight: '0.71rem',
    selectors: {
      ':last-child': {
        fontWeight: '700',
        fontSize: '1.5rem',
        top: '-0.1rem',
        color: 'hsl(0, 0%, 20%)',
        maxWidth: 'unset'
      }
    }
  },
  chevron: {
    paddingRight: '0.71rem'
  }
}



/* React Component ----------------------------------------------------------*/
/**
 * Renders breadcrumbs for our single page application. By default it disables
 * the current page.
 */
export default class NavPage extends React.Component {
  /**
   * Creates an object for creating a MS Fabric Breadcrumb item.
   * @param {string} key Unique key for breadcrumb. Required by React.
   * @param {string} text Text to display for breadcrumb.
   * @param {boolean} current Indicates if we should disable breadcrumb
   * @param {(string|boolean)} path Route to navigate when breadcrumb `onClick`.
   * @returns {Object} breadcrumb Options for breadcrumb item.
   */
  createProps = (key, text, current, path=false) => {
    const { history } = this.props;
    const breadcrumb = {
      key          : key,
      text         : text,
      isCurrentItem: current,
    
      onClick      :  () => history.push(path)
    };
    return breadcrumb;
  }

  getCalendarBreadcrumb = () => {
    const cal_pg_props = this.createProps('CalCrumb', 'Room Calendar', "/calendar");
    return cal_pg_props;
  }

  getDiagramBreadcrumb = () => {
    const diag_pg_props = this.createProps('DiagCrumb', 'First Floor Floorplan', '/floorplan');
    return diag_pg_props;
  }

  /**
   * Returns an object describing the properties of a EventPage breadcrumb.
   * @param {Object} props Properties passed from page calling NavPage.
   * @returns {Object} evt_pg_props
   */
  getEventPageBreadcrumb = package_id => {
    const evt_pg_props = this.createProps('EvtPgCrumb', `Event #${package_id}`, true);
    return evt_pg_props;
  }

  /**
   * Returns an object describing the properties of the Dashboard breadcrumb.
   * @returns {Object} dash_props
   */
  getDashboardBreadcrumb = () => {
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
  getHomeBreadcrumb = () => {
    // Find our current location
    const { history: { location: { pathname }}} = this.props;
    const path      = "/";
    const currentPg = pathname === path;

    // Create the props
    const home_props = this.createProps('homeCrumb', 'Home', currentPg, path);
    return home_props;
  }

  getAboutBreadcrumb = () => {
    const { history: { location: { pathname }}} = this.props;
    const path = "/about";
    
    // Props
    const about_props = this.createProps('aboutCrumb', 'About', true, path);
    return about_props;
  }

  /**
   * Returns an object describing the properties of the Form breadcrumb.
   * @returns {Object} home_props
   */
  getFormBreadcrumb = () => {
    const form_props = this.createProps('formCrumb', 'Create an Event', true);
    return form_props;
  }

  getStepBreadcrumb = () => {
    const { history: { location: { pathname }}} = this.props;
    const splitPath = pathname.split('/');
    const step = splitPath[splitPath.length - 1];

    const capitalStep = step.charAt(0).toUpperCase() + step.slice(1);
    
    const step_props = this.createProps('stepCrumb', capitalStep, true);
    return step_props;
  }

  /**
   * Higher Order Function creating all of the breadcrumbs given our history
   * and passed props.
   * @param {Object} Properties
   * @returns {Array[Object]} crumbs A list of Breadcrumb prop objects.
   */
  createCrumbs = () => {
    const { history: { location: { pathname }}} = this.props;
    
    // By default we should be able to see the home page
    let crumbs = [this.getHomeBreadcrumb()];
    
    // But we rely on our location for any other breadcrumbs...
    // Check if we're on About page
    if (pathname === "/about") crumbs.push(this.getAboutBreadcrumb());

    // Check if we're on the calendar
    if (pathname === "/calendar") crumbs.push(this.getCalendarBreadcrumb());

    // Check if we're on the diagram page
    if (pathname === '/floorplan') crumbs.push(this.getDiagramBreadcrumb());

    // Check if we're on our dashboard
    if (pathname === "/dashboard") crumbs.push(this.getDashboardBreadcrumb());

    // Check if we're viewing specific event
    if (pathname.startsWith("/event/")) {
      // Infer package_id from pathname. Usually like => /event/1111
      // With signature_id it's => /event/111/222
      let splitPath  = pathname.split("/");
      let package_id = splitPath[2]; 
      crumbs.push(this.getDashboardBreadcrumb());
      crumbs.push(this.getEventPageBreadcrumb(package_id));
    };

    // Check if we're creating an event
    if (pathname.startsWith("/form")) {
      crumbs.push(this.getFormBreadcrumb());
      crumbs.push(this.getStepBreadcrumb());
    }

    return crumbs;
  }

  render() {
    const { history: { location: { pathname }}} = this.props;

    const notHome = pathname !== '/';
    const isForm  = (pathname.startsWith('/form') && !pathname.endsWith('/layout')) ?
      ' NavPage--Form' : '';

    return (
      <div className={`NavPage${isForm}`}>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-fadeIn20">
            {notHome && 
              <Breadcrumb
                styles={styles}
                maxDisplayedItems={3}
                items={this.createCrumbs()}
              />}
          </div>
        </div>
      </div>
    );
  }
}