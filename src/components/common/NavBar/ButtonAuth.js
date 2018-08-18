const ButtonAuth = (props) => {
  let { loggedIn } = props;

  // Styles
  let iconName = (loggedIn) ? 'Unlock' : 'Lock';
  let linkText = (loggedIn) ? 'Logout' : 'Login';
  let linkUri  = (loggedIn) ? 'logout' : '';
  let linkHref = `${process.env.REACT_APP_REDIRECT_URI}/auth/${linkUri}`;

  return {
    key: 'auth',
    name: linkText,
    iconProps: {
      iconName: iconName,
      style: { color: '#333333' }
    },
    href: linkHref
  };
};

export default ButtonAuth;