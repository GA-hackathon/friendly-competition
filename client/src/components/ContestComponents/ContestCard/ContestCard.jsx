import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
import { compareDateWithCurrentTime } from "../../../utils/compareDateWithCurrentTime";
import Button from "@material-ui/core/Button";

let Container = styled.div`
  display: block;
  picture {
    display: block;
  }

  a {
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
    font-size: 1.3rem;
    margin-top: 10px;
  }
  .contest-card.date {
    font-size: 1.3rem;
    margin-top: 10px;
  }
  footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  /* .vector {
    left: 69.37%;
    right: 7.91%;
    top: 0%;
    bottom: 72.83%;

    background: #080808;
    border: 1px solid #000000;
  } */
`;
function ContestCard({ contest }) {
  let currentTime = new Date();

  return (
    <Container>
      {contest?.submissions.length >= 1 && (
        <svg
          width="117"
          height="171"
          viewBox="0 0 117 171"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 170V1H116V170L59.869 131.298L1 170Z"
            fill="#080808"
            stroke="black"
          />
          <p>
            {contest?.submissions?.length}
            <br /> Entries
          </p>
        </svg>
      )}

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
      <footer className="contest-card actions">
        <Button
          variant="contained"
          component={Link}
          to={`contests/${contest.id}`}
        >
          View Contest
        </Button>
      </footer>
    </Container>
  );
}

export default ContestCard;
