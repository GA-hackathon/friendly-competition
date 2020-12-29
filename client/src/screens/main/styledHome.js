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
`;

export default Wrapper;
