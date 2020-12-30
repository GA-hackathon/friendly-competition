import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
import { compareDateWithCurrentTime } from "../../../utils/compareDateWithCurrentTime";
import Button from "@material-ui/core/Button";

let Container = styled.div`
  display: block;
  position: relative;

  picture {
    margin-left: auto;
    margin-right: auto;
    display: block;
    /* width: 100%; */
    border-radius: 16px;
    overflow: hidden;
    width: 300px;
    min-width: 300px;
    height: 300px;
    position: relative;
    transform: scale(1);
    transition: 250ms ease-in-out;
    &:hover {
      transform: scale(1.06);
      transition: 250ms ease-in-out;
    }
  }

  picture img {
    display: block;
    width: 100%;
    height: 100%;
    /* max-width: 250px; */
    /* max-height: 250px; */
    margin-top: 10px;
    margin: 0 auto;
  }

  /* .contest-card.thumbnail {
    width: 250px;
    height: 250px;
    max-width: 250px;
    max-height: 250px;
    margin-top: 10px;
    margin: 0 auto; */
  /* transform: scale(1.1);
    transition: 3s;
    &:hover {
      transform: scale(1);
      transition: 0.2s;
    } */
  /* } */

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

  .text.entries {
    font-family: "roboto", sans-serif;
    fill: #fff;
    transform: translate(28px, 74px);
    font-size: 1.3rem;
    font-weight: 900;
  }

  .text.length {
    font-family: "roboto", sans-serif;
    fill: #fff;
    transform: translate(48px, 40px);
    font-size: 1.8rem;
    font-weight: 900;
  }

  svg {
    /* position: absolute;
    top: 16px;
    left: 3px;
    /* transform: scale(1.1); */
    /* transition: 3s;
    &:hover {
      transform: scale(1);
      transition: 0.2s;
    } */
    position: absolute;
  }
`;

function ContestCard({ contest, allContests }) {
  let currentTime = new Date();

  return (
    <>
      <Container>

        <Link className="link-container" to={`contests/${contest.id}`}>
          <picture>
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
                {/*   <text x="20" y="35" class="small">My</text>
               */}
                <text className="text length">
                  {contest?.submissions?.length}
                </text>
                <text className="text entries">Entries</text>
              </svg>
            )}
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
    </>
  );
}

export default ContestCard;
