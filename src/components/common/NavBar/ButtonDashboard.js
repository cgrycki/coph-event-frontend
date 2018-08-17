/**
 * Returns CommandBarButton config for our Dashboard page.
 * @param {Object} props - Props passed to Nav
 */
const ButtonDashboard = (props) => {
  let { loggedIn, location, history } = props;
  
  // Disable if we're not logged in AND not currently on dash page.
  let disabled = (loggedIn && !location.pathname.startsWith("/dashboard")) ?
    false : true;
  // Match disabled colors
  let icon_color = (disabled) ? '#c8c8c8' : '#333333';

  return {
    key      : 'dashboard',
    name     : 'My Events',
    disabled : disabled,
    iconProps: {
      iconName: 'EventDate',
      style   : { color: icon_color }
    },
    onClick: () => history.push("/dashboard")
  };
}

export default ButtonDashboard;