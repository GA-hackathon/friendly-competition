import { useState } from "react";
import { registerUser } from "../../../services/auth";
import { useStateValue } from "../../../providers/CurrentUserProvider";

function Register() {
  const [{ currentUser }, dispatch] = useStateValue();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  //  https://material-ui.com/components/text-fields/

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };

  return (
    <>
      <h1>Register Page</h1>
      <button onClick={handleShowPassword}>Show password</button>
      <button onClick={handleShowPasswordConfirm}>Show password Confirm</button>

      <form>
        <label>
          First Name:
          <input type="text" name="firstname" />
        </label>
        <label>
          Last name:
          <input type="text" name="lastname" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type={showPassword ? "text" : "password"} name="password" />
        </label>
        <label>
          Password confirmation:
          <input
            type={showPasswordConfirm ? "text" : "password"}
            name="password-confirm"
          />
        </label>
        <label>
          Zip code:
          <input type="number" name="zipcode" />
        </label>
        <label>
          Avatar:
          <input type="avatar" name="avatar" />
        </label>
        <img
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png"
          alt="camera"
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Register;
