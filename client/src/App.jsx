import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/main/Home/Home";
import Login from "./screens/auth/Login/Login";
import Register from "./screens/auth/Register/Register";
import ContestCreate from "./screens/ContestScreens/ContestCreate/ContestCreate.jsx";
import { useStateValue } from "./providers/CurrentUserProvider";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { verifyUser } from "./services/auth";

function App() {
  const [, dispatch] = useStateValue();
  const history = useHistory();
  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      dispatch({ type: "SET_USER", currentUser: userData });
      if (!userData) {
        console.log("no user signed in at the moment");
      } else {
        console.log(` you are signed in!`);
      }
      // lines 18 to 22 will be deleted once we verify that the user auth works
    };
    handleVerify();
  }, [history, dispatch]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/create-contest" component={ContestCreate} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
