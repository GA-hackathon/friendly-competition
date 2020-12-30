import styled from "styled-components";

let StyledLoading = styled.div`
  @keyframes float {
    0% {
      box-shadow: none;
      transform: translatey(0px);
    }
    50% {
      box-shadow: none;
      transform: translatey(-20px);
    }
    100% {
      box-shadow: none;
      transform: translatey(0px);
    }
  }

  .content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    margin-left: auto;
    margin-right: auto;
  }

  .loading-wrapper {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100vh;
    max-height: 100%;
  }

  logo-container {
    display: flex;
    justify-self: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    animation: float 6s ease-in-out infinite;
  }

  .logo {
    width: 100px;
    margin: 20px;
  }

  .loadingTitle {
    font-size: 2rem;
    margin-top: 20px;
  }

  .loading { 
    margin-top: 30%;
  }
`;
export default StyledLoading;
