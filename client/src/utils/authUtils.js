// for email validation referenced this: https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html
import { validEmailPattern as pattern } from "./regexUtils";

export const checkEmailValidity = (email, setEmailAlert) => {
  if (typeof email !== undefined) {
    if (!pattern.test(email)) {
      setEmailAlert(true);
    }
    if (pattern.test(email)) {
      setEmailAlert(false);
    }
  }
};

// export const checkPasswordValidity = (password, setPasswordAlert) => {
// passwordPattern referred from here = "https://codepen.io/prampcontent/pen/WgepzQ"
//{minimum 8, maximum 20}
//   let passwordPattern = new RegExp(/^(((?=.*[0-9])(?=.*[a-zA-Z])).{8,20}$)/i);

//   if (typeof password !== undefined) {
//     if (!pattern.test(passwordPattern)) {
//       return setPasswordAlert(true);
//     }

//     if (pattern.test(passwordPattern)) {
//       setPasswordAlert(false);
//     }
//   }
// };

export const checkPasswordValidity = (password, setPasswordAlert) => {
  if (typeof password !== undefined) {
    if (password?.length < 8) {
      setPasswordAlert(true);
    }
  }
  if (password?.length >= 8) {
    setPasswordAlert(false);
  }
};

// if the email entered in Edit account matches one of the existing users, and that email does not equal to the logged-in user's email, set the alert to true
// I'm forcing the email to lowerCase just in case user input is uppercase, so that way the alert is still set to true if it matches an existing email
export const checkEmailUniqueness = (
  allUsers,
  email,
  setEmailUniquenessAlert,
  currentUser
) => {
  if (
    allUsers?.find(
      (user) =>
        user?.email.toLowerCase() === email.toLowerCase() &&
        user?.email.toLowerCase() !== currentUser?.email.toLowerCase()
    )
  ) {
    setEmailUniquenessAlert(true);
  } else {
    setEmailUniquenessAlert(false);
  }
};
