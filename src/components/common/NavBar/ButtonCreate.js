/**
 * Renders the 'Create Event' button in our navigation bar.
 * @param {Object} props - Props passed down from connected NavBar.
 * @param [props.loggedIn] {boolean} - User login status.
 * @param [props.location] {Object} - Location object provided by React Router DOM.
 * @param [props.history] {Object} - History object provided by React Router DOM.
 * @returns {Object} CommandBarButton props.
 */
const ButtonCreate = (props) => {
  let { loggedIn, location, history } = props;
  
  // Determine if we should disable this button
  let disabled = (loggedIn && !location.pathname.startsWith("/form")) ? 
    false : true;
  // And match disabled colors
  let icon_color = (disabled) ? '#c8c8c8' : '#333333';
  
  return {
    key      : 'create',
    name     : 'Create Event',
    disabled : disabled,
    iconProps: {
      iconName: 'AddEvent',
      style   : { color: icon_color }
    },
    onClick: () => history.push("/form/user")
  };
};

export default ButtonCreate;