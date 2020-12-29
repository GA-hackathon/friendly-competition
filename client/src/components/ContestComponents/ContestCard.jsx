import React from "react";

function ContestCard({ contest }) {
  return <img src={contest.picture} alt={contest.name}></img>;
}

export default ContestCard;
