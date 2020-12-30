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
      setAllVotes(voteData?.filter((vote) => vote?.submission_id === submission?.id));
      setVoteDisabled(false);
    };
    fetchVotes();
  }, [submission?.id]);

  useEffect(() => {
    const voteFound = allVotes?.find(
      (vote) =>
        vote?.submission_id === submission?.id && currentUser?.id === vote?.user_id
    );
    voteFound ? setVoted(true) : setVoted(false);
  }, [allVotes, currentUser?.id, submission?.id]);

  const handleVote = async () => {
    if (!voteDisabled) {
      setVoted(true);
      const newVote = await postVote({
        user_id: currentUser.id,
        submission_id: submission.id,
      });
      setAllVotes((prevState) => [...prevState, newVote]);
    }
  };

  const handleUnvote = async () => {
    if (!voteDisabled) {
      setVoted(false);
      const voteToDelete = allVotes?.find(
        (vote) =>
          vote?.submission_id === submission?.id && currentUser?.id === vote?.user_id
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
      {submission?.file && <img src={submission?.file} alt={submission.name} />}
      <p>{allVotes.length === 1 ? <>{allVotes.length} vote</> : allVotes.length === 0 ? <>no votes</> : <>{allVotes.length} votes</>}</p>
      {!voted ? <Button disabled={voteDisabled} onClick={handleVote}>Vote For Me</Button> : <><Button onClick={handleUnvote}>Unvote</Button> </>}
    </div>
  )
}

export default SubmissionCard
