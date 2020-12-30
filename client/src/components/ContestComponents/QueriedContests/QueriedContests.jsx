import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  overflow-wrap: break-word;
  font-size: 0.6rem;
  padding: 8px;
  font-family: "montserrat", sans-serif;
  transition: transform 300ms ease-in-out;
  display: inline-flex;
  align-items: center;
  &:hover {
    transition: transform 300ms ease-in-out;
    text-decoration: underline;
    cursor: pointer;
    transform: translateY(-1.06px);
  }
 
`;

function QueriedContests({ contest }) {
  return (
    <StyledLink
      key={contest.id}
      to={`/contests/${contest.id}`}
      className="link"
    >
     
      <h1>{contest?.name}</h1>
    </StyledLink>
  );
}

export default QueriedContests;