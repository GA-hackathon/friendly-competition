import React from "react";
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";

let Container = styled.div`
  picture {
    display: block;
  }

  picture img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto;
  }

  .thumbnail {
    max-width: 300px;
    margin-top: $pad;
    margin: 0 auto;
    transform: scale(1.1);
    transition: 3s;
    &:hover {
      transform: scale(1);
      transition: 0.2s;
    }
  }
`;
function ContestCard({ contest }) {
  return (
    <Container>
      <picture>
        <img className="thumbnail" src={contest.picture} alt={contest.name} />
      </picture>
    </Container>
  );
}

export default ContestCard;
