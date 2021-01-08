import { useState } from "react";
import { useStateValue } from "../../../providers/CurrentUserProvider";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../services/auth";
import Button from "@material-ui/core/Button";
import Navbar from "../../../layout/Navbar/Navbar";
import './Login.css';
import { goBack } from "../../../utils/goBack";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

function Login() {
  const [, dispatch] = useStateValue();
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleLogin = async (loginData) => {
    loginData.email = loginData?.email?.toLowerCase();
    const userData = await loginUser(loginData);
    dispatch({ type: "SET_USER", currentUser: userData });
    history.push("/");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className="arrow-container">
        <IconButton className="arrow-icon" onClick={goBack}>
          <ArrowBackOutlinedIcon className="arrow-icon" />
        </IconButton>
      </div>

      <div className="inner-column-login">
        <div className="title-container">
          <h2 style={{ marginBottom: '0' }}>LOGIN TO CHALLENGE.ME</h2>
        </div>
        <form className='login-form'
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(formData);
          }}
        >
          <div className='login-form'>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='login-form'>
            <InputLabel htmlFor="password">Password</InputLabel>

            <Input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="button-container">
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
