// for email validation referenced this: https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html
import { validEmailPattern as emailPattern } from "./regexUtils";
import {
  atLeastOneNumber,
  atLeastOneLowerCase,
  atLeastOneUpperCase,
  atLeastOneSpecialCharacter,
} from "./regexUtils";

export const checkEmailValidity = (email, setEmailAlert) => {
  if (typeof email !== undefined) {
    if (!emailPattern.test(email)) {
      setEmailAlert(true);
    }
    if (emailPattern.test(email)) {
      setEmailAlert(false);
    }
  }
};

export const checkPasswordValidity = (
  value,
  setPasswordHasLowerCase,
  setPasswordHasUpperCase,
  setPasswordLengthValid,
  setPasswordHasNumber,
  setPasswordHasSpecialCharacter
) => {
  if (value.match(atLeastOneLowerCase)) {
    setPasswordHasLowerCase(true);
  } else {
    setPasswordHasLowerCase(false);
  }

  if (value.match(atLeastOneUpperCase)) {
    setPasswordHasUpperCase(true);
  } else {
    setPasswordHasUpperCase(false);
  }

  if (value.length <= 20 && value.length >= 8) {
    setPasswordLengthValid(true);
  } else {
    setPasswordLengthValid(false);
  }

  if (value.match(atLeastOneNumber)) {
    setPasswordHasNumber(true);
  } else {
    setPasswordHasNumber(false);
  }

  if (value.match(atLeastOneSpecialCharacter)) {
    setPasswordHasSpecialCharacter(true);
  } else {
    setPasswordHasSpecialCharacter(false);
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
