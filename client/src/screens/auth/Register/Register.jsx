import { useState } from "react";
import { registerUser } from "../../../services/auth";
import { useStateValue } from "../../../providers/CurrentUserProvider";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import FetchUsers from "../../../components/Helpers/FetchAllUsers";
import {
  checkPasswordLength,
  checkEmailValidity,
} from "../../../utils/authUtils.js";
import Wrapper from "./styledRegister";

function Register() {
  const [{ currentUser }, dispatch] = useStateValue();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [emailValidityAlert, setEmailValidityAlert] = useState(false);
  const [passwordConfirmAlert, setPasswordConfirmAlert] = useState(false);
  const [emailUniquenessAlert, setEmailUniquenessAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const history = useHistory();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    zip_code: "",
    image: "",
  });
  const { first_name, last_name, email, password, zip_code, image } = formData;

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };

  const onImageSelected = (e) => {
    const img = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setFormData({
        ...formData,
        image: fileReader.result,
      });
    });
    if (img) {
      fileReader.readAsDataURL(img);
    }
  };

  const selectImage = () => {
    document.getElementById("image-upload").click();
  };

  // const handleImageClear = () => {
  //   setFormData({
  //     ...formData,
  //     image: "",
  //   });
  //   document.getElementById("image-upload").value = "";
  // };

  const handleFormValidity = () => {
    checkPasswordLength(password, setPasswordAlert);
    checkEmailValidity(email, setEmailValidityAlert);
    if (allUsers.find((user) => user.email === email)) {
      return setEmailUniquenessAlert(true);
    } else {
      setEmailUniquenessAlert(false);
    }
    if (password !== passwordConfirm) {
      return setPasswordConfirmAlert(true);
    } else {
      setPasswordConfirmAlert(false);
    }
  };

  const handleRegister = async (registerData) => {
    const userData = await registerUser(registerData);
    dispatch({ type: "SET_USER", currentUser: userData });
    history.push("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormValidity();
    handleRegister(formData);
  };

  return (
    <Wrapper>
      <FetchUsers setAllUsers={setAllUsers} />
      <h1>Register Page</h1>

      {image && <img className="avatar-image" src={image} alt={first_name} />}

      <img
        width="150px"
        src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png"
        alt="camera"
        onClick={selectImage}
      />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FormControl>
            <InputLabel htmlFor="first_name">First Name</InputLabel>

            <Input
              type="text"
              value={first_name}
              name="first_name"
              onChange={handleChange}
            />
          </FormControl>
        </div>

        <div className="input-container">
          <FormControl>
            <InputLabel htmlFor="last_name">Last Name</InputLabel>
            <Input
              type="text"
              value={last_name}
              name="last_name"
              onChange={handleChange}
            />
          </FormControl>
        </div>

        <div className="input-container">
          <FormControl>
            <InputLabel htmlFor="Email">Email Address</InputLabel>
            <Input
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div className="input-container">
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className="input-container">
          <FormControl>
            <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
            <Input
              type={showPasswordConfirm ? "text" : "password"}
              name="password-confirm"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPasswordConfirm}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        {passwordConfirmAlert && (
          <>
            <div className="alert">
              <p>Password and password confirmation do not match!</p>
            </div>
            <br />
          </>
        )}

        <div className="input-container">
          <FormControl>
            <InputLabel htmlFor="zip_code">Zip code:</InputLabel>
            <Input
              type="text"
              value={zip_code}
              name="zip_code"
              onChange={handleChange}
            />
          </FormControl>
        </div>

        <input
          type="file"
          id="image-upload"
          style={{ visibility: "hidden" }}
          onChange={onImageSelected}
        />
        <button type="submit">Register</button>
      </form>
    </Wrapper>
  );
}

export default Register;
