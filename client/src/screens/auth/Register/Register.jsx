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
        first_name: first_name,
        last_name: last_name,
        password: password,
        zip_code: zip_code,
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

  const handleImageClear = () => {
    setFormData({
      ...formData,
      image: "",
    });
    document.getElementById("image-upload").value = "";
  };

  const handleFormValidity = () => {
    checkPasswordLength(password, setPasswordAlert);
    checkEmailValidity(email, setEmailValidityAlert);
    if (allUsers.find((user) => user.email === email)) {
      setEmailUniquenessAlert(true);
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
    registerData.email = registerData?.email?.toLowerCase;
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
    <>
      <FetchUsers setAllUsers={setAllUsers} />
      <h1>Register Page</h1>

      {image && <img className="avatar-image" src={image} alt={first_name} />}

      <button onClick={handleShowPassword}>Show password</button>
      <button onClick={handleShowPasswordConfirm}>Show password Confirm</button>

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <Input type="text" name="first_name" />
        </label>
        <label>
          Last name:
          <Input type="text" name="last_name" />
        </label>
        <label>
          Email:
          <Input type="email" name="email" />
        </label>
        <label>
          Password:
          <Input type={showPassword ? "text" : "password"} name="password" />
        </label>
        <label>
          Password confirmation:
          <Input
            type={showPasswordConfirm ? "text" : "password"}
            name="password-confirm"
          />
        </label>
        <label>
          Zip code:
          <Input type="number" name="zip_code" />
        </label>

        <img
          width="150px"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png"
          alt="camera"
          onClick={selectImage}
        />
        <input type="submit" value="Submit" />
      </form>
      <button>Register</button>
    </>
  );
}

export default Register;
