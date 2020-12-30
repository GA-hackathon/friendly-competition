import styled from "styled-components";

let Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .MuiFormControl-root {
    width: 250px;
    max-width: 250px;
  }

  .title-container {
    text-align: center;
    h1 {
      font-size: 2rem;
      font-size: clamp(1.5rem, 5.5vw, 2rem);
      font-family: 'Roboto', sans-serif;
    }
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

  .inner-column{
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    width: 60%;
    margin: auto;
  }

  .big-user-image {
    height: 100px;
    width: 100px;
    align-self: center;
    margin-bottom: 5px;
    border: "1px solid black"};
    border-radius: 50%;
    object-fit: cover;
  }

  .big-icon {
    height: 100px;
    width: 100px;
    align-self: center;
    margin-bottom: 5px;
  }

  .button-container{
    padding: 20px;
  }

  .arrow-container{
    left: 0;
    position: absolute;
    top: 0;
    padding: 10px;
  }

  .arrow-icon {
    font-size: clamp(30px, 10vw, 60px);
    padding: 1px;
  }

`;

export default Wrapper;
