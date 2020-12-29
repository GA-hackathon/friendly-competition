import { Link } from "react-router-dom";
import Navbar from './Navbar/Navbar.jsx';

function Intro() {
  return (
    <div>
      <Navbar />
      <Link to="/login">Login</Link>
      <Link to="/register">Sign up!</Link>
    </div>
  );
}

export default Intro;
