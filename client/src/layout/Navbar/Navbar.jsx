import { Link } from "react-router-dom";
import { useStateValue } from "../../providers/CurrentUserProvider";
import { useHistory, useLocation } from "react-router-dom";
import { removeToken } from "../../services/auth";
import Button from "@material-ui/core/Button";
import logo from './logo.png';
import Nav from './styledNavbar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
        <ul className="links">
          <li className="nav-block home">
            <Link className='logo' to="/"><img style={{ width: '4rem', height: '3rem' }} src={logo} alt="logo" /></Link>
          </li>
          <li className="nav-block create">
            <Link to="/create-contest"><span>CREATE CONTEST</span></Link>
          </li>
          <li className="nav-block about">
            <Link to="/"><span>ABOUT CHALLENGE.ME</span></Link>
          </li>
        </ul>
        <div className="user-column">
          <div className='user-info'>
            {currentUser && (<Link className="profile-link" to={`/users/${currentUser?.id}`}>
            {!currentUser?.image ? (
              <AccountCircleIcon className='account-circle-icon' />
            ) : (<img
              className="user-image"
              src={currentUser.image}
              alt={currentUser?.name}
            />
              )}
              <div className="name">{currentUser?.first_name}</div>
          </Link>
          )}
          </div>
          <div className="auth-buttons">
            {currentUser && (
            <input className='sign-out-btn' type='Submit' value='Sign Out' 
              onChange={handleLogout}
            />
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
    </Nav>
  );
}

export default Navbar;
