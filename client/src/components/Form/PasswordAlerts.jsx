import styled from "styled-components";

const AlertContainer = styled.div`
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding-left: 20px;
  }

  /* https://stackoverflow.com/questions/15163071/list-item-with-asterix */
  li:before {
    content: "*";
  }

  .length-alert {
    color: ${({ passwordLengthValid }) =>
      passwordLengthValid ? "grey" : "red"};
  }

  .number-alert {
    color: ${({ passwordHasNumber }) => (passwordHasNumber ? "grey" : "red")};
  }

  .lowercase-alert {
    color: ${(props) => (props.passwordHasLowerCase ? "grey" : "red")};
  }

  .uppercase-alert {
    color: ${(props) => (props.passwordHasUpperCase ? "grey" : "red")};
  }

  .special-character-alert {
    color: ${({ passwordHasSpecialCharacter }) =>
      passwordHasSpecialCharacter ? "grey" : "red"};
  }

  .match-alert {
    color: ${({ password, passwordConfirm }) =>
      password === passwordConfirm ? "grey" : "red"};
  }
`;

const PasswordAlerts = (props) => (
  <AlertContainer
    passwordLengthValid={props.passwordLengthValid}
    passwordHasNumber={props.passwordHasNumber}
    passwordHasLowerCase={props.passwordHasLowerCase}
    passwordHasUpperCase={props.passwordHasUpperCase}
    passwordHasSpecialCharacter={props.passwordHasSpecialCharacter}
    password={props.password}
    passwordConfirm={props.passwordConfirm}
    className="password-alert"
  >
    <li className="length-alert">
      Password has to be between 8 and 20 characters
    </li>
    <li className="number-alert">
      Password has to be have at least one number
    </li>
    <li className="lowercase-alert">
      Password must have at least 1 lowercase letter
    </li>

    <li className="uppercase-alert">
      Password must have at least 1 capital letter
    </li>
    <li className="special-character-alert">
      Password must have at least 1 special character (@$!%*?&)
    </li>
    <li className="match-alert">
      Password and password confirmation must match
    </li>
  </AlertContainer>
);

export default PasswordAlerts;
