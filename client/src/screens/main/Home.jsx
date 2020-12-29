import { Link } from "react-router-dom";
import { useStateValue } from "../../providers/CurrentUserProvider";
import { removeToken } from "../../services/auth";
import { useHistory } from "react-router-dom";

function Home() {
  const [{ currentUser }, dispatch] = useStateValue();

  const history = useHistory();
  const handleLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    localStorage.removeItem("authToken");
    removeToken();
    history.push("/");
  };

  return (
    <div>
      <div>{currentUser && <>Welcome {currentUser?.first_name}</>}</div>
      {currentUser && <button onClick={handleLogout}>Log Out</button>}
      <Link to="/login">Login</Link>
      <Link to="/register">Sign up!</Link>
    </div>
  );
}

export default Home;
