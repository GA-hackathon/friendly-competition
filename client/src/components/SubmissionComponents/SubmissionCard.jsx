import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { getAllVotes, destroyVote, postVote } from "../../services/votes";

function SubmissionCard({ submission, contest, currentUser }) {
  const [allVotes, setAllVotes] = useState([]);
  const [voted, setVoted] = useState(false);
  const [voteDisabled, setVoteDisabled] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      const voteData = await getAllVotes();
      setAllVotes(voteData?.filter((vote) => vote?.contest_id === contest?.id));
      setVoteDisabled(false);
    };
    fetchVotes();
  }, [contest?.id]);

  useEffect(() => {
    const voteFound = allVotes?.find(
      (vote) =>
        vote?.contest_id === contest?.id && currentUser?.id === vote?.user_id
    );
    voteFound ? setVoted(true) : setVoted(false);
  }, [allVotes, currentUser?.id, contest?.id]);

  const handleVote = async () => {
    if (!voteDisabled) {
      setVoted(true);
      const newVote = await postVote({
        user_id: currentUser.id,
        contest_id: contest.id,
      });
      setAllVotes((prevState) => [...prevState, newVote]);
    }
  };

  const handleUnvote = async () => {
    if (!voteDisabled) {
      setVoted(false);
      const voteToDelete = allVotes?.find(
        (vote) =>
          vote?.contest_id === contest?.id && currentUser?.id === vote?.user_id
      );
      await destroyVote(voteToDelete.id);
      setAllVotes((prevState) =>
        prevState.filter((vote) => vote.id !== voteToDelete?.id)
      );
    }
  };

  return (
    <div>
      <h1>{submission.name}</h1>
      <p>{submission.content}</p>
      <img src={submission.file} />

      {!voteDisabled && (!voted ? <Button onClick={handleVote}>Vote For Me</Button> : <></>)}}
    </div>
  )
}

export default SubmissionCard
