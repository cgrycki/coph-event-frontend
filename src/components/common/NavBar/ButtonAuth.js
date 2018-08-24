/**
 * Creates a 'login'/'logout' button for site navigation bar.
 * @param {Object} props - Props passed from NavBar
 * @param [props.logged_in] {boolean} Boolean from app storing authentication status.
 * @returns {Object} CommandBarItem props
 */
const ButtonAuth = (props) => {
  let { logged_in } = props;

  // Styles
  let iconName = (logged_in) ? 'Unlock' : 'Lock';
  let linkText = (logged_in) ? 'Logout' : 'Login';
  let linkUri  = (logged_in) ? 'logout' : '';
  let linkHref = `${process.env.REACT_APP_REDIRECT_URI}/auth/${linkUri}`;

  return {
    key      : 'auth',
    name     : linkText,
    iconProps: { iconName: iconName },
    href     : linkHref
  };
};

export default ButtonAuth;