import styled from "styled-components";

let Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .row-1 {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }
  div {
    margin: 5px;
  }
  a {
    padding: 5px;
  }
  .user-avatar-header {
    height: 100px;
    width: 100px;
    align-self: center;
    margin-bottom: 5px;
    border: "1px solid black";
    border-radius: 50%;
    object-fit: cover;
  }
`;

export default Wrapper;
