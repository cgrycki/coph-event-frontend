/**
 * Creates a navigation bar button props for CommandBar.
 * @param {Object} props Properties passed from NavBar
 */
const ButtonCal = (props) => {
  let { location, history } = props;
  let disabled = location.pathname.startsWith("/calendar");

  return {
    key      : "calendar",
    name     : "Calendar",
    disabled : disabled,
    iconProps: { iconName: "Calendar" },
    onClick  : () => history.push("/calendar")
  };
}

export default ButtonCal;