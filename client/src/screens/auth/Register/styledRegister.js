import styled from "styled-components";

let Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiFormControl-root {
    width: 250px;
    max-width: 250px;
  }

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .alert {
    color: red;
  }

  .user-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .big-user-image {
    height: 100px;
    width: 100px;
    align-self: center;
    margin-bottom: 5px;
    border: ${({ darkMode }) =>
      darkMode === "dark" ? "1px solid white" : "1px solid black"};
    border-radius: 50%;
    object-fit: cover;
  }

  .big-icon {
    height: 100px;
    width: 100px;
    align-self: center;
    margin-bottom: 5px;
  }
`;

export default Wrapper;
