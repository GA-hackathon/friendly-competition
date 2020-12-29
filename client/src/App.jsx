import "./App.css";
import { Switch, Route } from "react-router-dom";
import Intro from "./screens/main/Intro";
import Login from "./screens/auth/Login/Login";
import Register from "./screens/auth/Register/Register";
import ContestForm from './screens/main/ContestForm/ContestForm';
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
        console.log("signed in!");
      }
      // lines 18 to 22 will be deleted once we verify that the user auth works
    };
    handleVerify();
  }, [history, dispatch]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={Intro} />
      <Route path='/create-contest' component={ContestForm} />
    </Switch>
  );
}

export default App;
