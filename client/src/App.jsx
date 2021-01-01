import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './screens/main/Home/Home';
import Login from './screens/auth/Login/Login';
import Register from './screens/auth/Register/Register';
import ContestCreate from './screens/ContestScreens/ContestCreate/ContestCreate';
import ContestPage from './screens/ContestScreens/ContestPage/ContestPage';
import { useStateValue } from './providers/CurrentUserProvider';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { verifyUser } from './services/auth';
import NotFound from './screens/error/NotFound';
import UserDetail from './screens/UserScreens/UserDetail/UserDetail';

function App() {
  const [, dispatch] = useStateValue();
  const history = useHistory();
  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      dispatch({ type: 'SET_USER', currentUser: userData });
    };
    handleVerify();
  }, [history, dispatch]);

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create-contest" component={ContestCreate} />
        <Route path="/contests/:id" component={ContestPage} />
        <Route path="/users/:id" component={UserDetail} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
