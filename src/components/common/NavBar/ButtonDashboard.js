/**
 * Returns CommandBarButton config for our Dashboard page.
 * @param {Object} props - Props passed to Nav
 */
const ButtonDashboard = (props) => {
  let { logged_in, location, history } = props;
  
  // Disable if we're not logged in AND not currently on dash page.
  let disabled = (logged_in && !location.pathname.startsWith("/dashboard")) ?
    false : true;

  return {
    key      : 'dashboard',
    name     : 'My Dashboard',
    disabled : disabled,
    iconProps: { iconName: 'ViewDashboard' },
    onClick  : () => history.push("/dashboard")
  };
}

export default ButtonDashboard;