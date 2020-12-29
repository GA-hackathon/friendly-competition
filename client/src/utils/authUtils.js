// for email validation referenced this: https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html

export const checkEmailValidity = (email, setEmailAlert) => {
  if (typeof email !== undefined) {
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      return setEmailAlert(true);
    }
    if (pattern.test(email)) {
      setEmailAlert(false);
    }
  }
};

export const checkPasswordLength = (password, setPasswordAlert) => {
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
