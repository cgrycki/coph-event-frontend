/**
 * Creates a 'login'/'logout' button for site navigation bar.
 * @param {Object} props - Props passed from NavBar
 * @param [props.loggedin] {boolean} Boolean from app storing authentication status.
 * @returns {Object} CommandBarItem props
 */
const ButtonAuth = (props) => {
  let { loggedIn } = props;

  // Styles
  let iconName = (loggedIn) ? 'Unlock' : 'Lock';
  let linkText = (loggedIn) ? 'Logout' : 'Login';
  let linkUri  = (loggedIn) ? 'logout' : '';
  let linkHref = `${process.env.REACT_APP_REDIRECT_URI}/auth/${linkUri}`;

  return {
    key      : 'auth',
    name     : linkText,
    iconProps: { iconName: iconName },
    href     : linkHref
  };
};

export default ButtonAuth;