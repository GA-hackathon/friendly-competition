import { Link } from "react-router-dom";

function Intro() {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/register">Sign up!</Link>
    </div>
  );
}

export default Intro;
