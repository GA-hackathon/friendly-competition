import { Link } from "react-router-dom";
import { useStateValue } from "../../../providers/CurrentUserProvider";
import { removeToken } from "../../../services/auth";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Search from "../../../components/Form/Search";
import Wrapper from "./styledHome";
import Layout from '../../../layout/Layout'
function Home() {
  const [{ currentUser }, dispatch] = useStateValue();
  const [search, setSearch] = useState("");

  const history = useHistory();
  const handleLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    localStorage.removeItem("authToken");
    removeToken();
    history.push("/");
  };

  return (
      <Layout>
    <Wrapper>
      <div className="row-1">
        {currentUser && <>Welcome {currentUser?.first_name}</>}&nbsp;
        {currentUser?.image && (
          <>
            <img
              src={currentUser?.image}
              alt={currentUser?.first_name}
              className="user-avatar-header"
            />
          </>
        )}
        <Search search={search} setSearch={setSearch} />
      </div>
      <div>
        {currentUser && <button onClick={handleLogout}>Log Out</button>}
        <Link to="/login">Login</Link>
        <Link to="/register">Sign up!</Link>
      </div>
    </Wrapper>
    </Layout>
  );
}

export default Home;
