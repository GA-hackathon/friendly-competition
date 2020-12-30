import styled from "styled-components";

let Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", sans-serif;

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

  .inner-column {
    text-align: center;
    padding: 20px;
    display: block;
    width: 98%;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
  }

  .contest-list {
    display: grid;
    grid-template-columns: repeat(1fr);
    grid-gap: 30px;
  }

  .attention {
    padding: 20px;
    font-size: clamp(19px, 7vw, 50px);
  }

  @media (min-width: 700px) {
    .contest-list {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      grid-gap: 20px;
    }
  }

  @media (max-width: 699px) {
    .contest-list {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`;

export default Wrapper;
