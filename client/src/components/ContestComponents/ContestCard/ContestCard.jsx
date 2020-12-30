import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
import { compareDateWithCurrentTime } from "../../../utils/compareDateWithCurrentTime";

let Container = styled.div`
  display: block;
  picture {
    display: block;
  }

  picture img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto;
    object-fit: cover;
    border-radius: 6px;
    cursor: pointer;
  }

  .contest-card.thumbnail {
    width: 250px;
    height: 250px;
    max-width: 250px;
    max-height: 250px;
    margin-top: 10px;
    margin: 0 auto;
    transform: scale(1.1);
    transition: 3s;
    &:hover {
      transform: scale(1);
      transition: 0.2s;
    }
  }

  .contest-card.name {
    font-size: 1.5rem;
    margin-top: 10px;
  }
  .contest-card.date {
    font-size: 1.3rem;
    margin-top: 10px;
  }
`;
function ContestCard({ contest }) {
  let currentTime = new Date();

  return (
    <Container>
      <Link to={`contests/${contest.id}`}>
        <picture>
          <img
            className="contest-card thumbnail"
            src={contest.picture}
            alt={contest.name}
          />
        </picture>
      </Link>
      <h1 className="contest-card name">{contest.name}</h1>
      <h2 className="contest-card date">
        {/* compareDateWithCurrentTime is imported from src/utils */}
        {/* if the current time has passed say "contest ended", else: say contest ends */}
        {compareDateWithCurrentTime(contest?.ending_time) === 1 ? (
          <>Contest ended&nbsp;</>
        ) : (
          <>Contest ends&nbsp;</>
        )}
        <Moment from={currentTime?.toISOString()}>{contest.ending_time}</Moment>
      </h2>
    </Container>
  );
}

export default ContestCard;
