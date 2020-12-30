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
    <Nav location={location} className="navbar">
      <div>
        <ul className="links">
          <li className="nav-block home">
            <Link className='logo' to="/"><img style={{ width: '4rem', height: '3rem' }} src={logo} alt="logo" /></Link>
          </li>
          <li className="nav-block create">
            <Link to="/create-contest">Create Contest</Link>
          </li>
          <li className="nav-block about">
            <Link to="/">About</Link>
          </li>
        </ul>
        <div className="user-column">
          <Link className="profile-link" to={`/users/${currentUser?.id}`}>
            {!currentUser?.image ? (
              ''
            ) : (
                <img
                  className="user-image"
                  src={currentUser?.image}
                  alt={currentUser?.name}
                />
              )}
          </Link>
          <div className="name">{currentUser?.first_name}</div>
          <div className="auth-buttons">
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
                variant="contained"
                component={Link}
                to="/login"
              >
                Log In
              </Button>
            )}
            {!currentUser && (
              <Button
                variant="contained"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </Nav>
  );
}

export default Navbar;
