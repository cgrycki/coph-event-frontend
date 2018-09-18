/**
 * Renders the 'Create Event' button in our navigation bar.
 * @param {Object} props - Props passed down from connected NavBar.
 * @param [props.logged_in] {boolean} - User login status.
 * @param [props.location] {Object} - Location object provided by React Router DOM.
 * @param [props.history] {Object} - History object provided by React Router DOM.
 * @returns {Object} CommandBarButton props.
 */
const ButtonCreate = (props) => {
  const { logged_in, location, clearFormAndPush } = props;
  
  // Determine if we should disable this button
  let disabled = (logged_in && !location.pathname.startsWith("/form")) ? 
    false : true;
  
  return {
    key      : 'create',
    name     : 'Create Event',
    disabled : disabled,
    iconProps: { iconName: 'AddEvent' },
    onClick  : () => clearFormAndPush()
  };
};

export default ButtonCreate;