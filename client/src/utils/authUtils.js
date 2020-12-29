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

export const checkPasswordLength = (password, setPasswordAlert) => {
  if (typeof password !== undefined) {
    if (password?.length < 6) {
      setPasswordAlert(true);
    }
  }
  if (password?.length >= 6) {
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
