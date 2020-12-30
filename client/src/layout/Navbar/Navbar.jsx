import "./Navbar.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { useStateValue } from "../../providers/CurrentUserProvider";
import { useHistory, useLocation } from "react-router-dom";
import { removeToken } from "../../services/auth";
import Button from "@material-ui/core/Button";
import logo from './logo.png';
import Nav from './styledNavbar'

function Navbar() {
  const [{ currentUser }, dispatch] = useStateValue();

  const history = useHistory();
  const handleLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    localStorage.removeItem("authToken");
    removeToken();
    history.push("/");
  };

  let location = useLocation()

  return (
    <Nav className="navbar">
      <div>
        <ul className="links">
          <li className="nav-block">
            <Link to="/">
              <img
                className="logo"
                src="https://i.imgur.com/YnBGN1P.png"
                alt="logo"
              />
            </Link>
          </li>
          <li className="nav-block">
            <Link to="/create-contest">Create Contest</Link>
          </li>
          <li className="nav-block">
            <Link>About</Link>
          </li>
        </ul>
      </div>
      <div className="user-column">
        <Link className="profile-link" to={`/users/${currentUser?.id}`}>
          {!currentUser?.image ? (
            <AccountCircleIcon className="icon" />
          ) : (
              <img
                className="user-image"
                src={currentUser?.image}
                alt={currentUser?.name}
              />
            )}
        </Link>
        <div className="name">{currentUser?.first_name}</div>
        <div className="buttons">
          {currentUser && (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
          {!currentUser && (
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/login"
            >
              Log In
            </Button>
          )}
          {!currentUser && (
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </Nav>
  );
}

export default Navbar;
