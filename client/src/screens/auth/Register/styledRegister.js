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
`;

export default Wrapper;
