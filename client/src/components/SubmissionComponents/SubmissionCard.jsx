import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { getAllVotes, destroyVote, postVote } from '../../services/votes';

function SubmissionCard({ submission, currentUser }) {
  const [allVotes, setAllVotes] = useState([]);
  const [voted, setVoted] = useState(false);
  const [voteDisabled, setVoteDisabled] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      const voteData = await getAllVotes();
      setAllVotes(
        voteData?.filter((vote) => vote?.submission_id === submission?.id),
      );
      setVoteDisabled(false);
    };
    fetchVotes();
  }, [submission?.id]);

  useEffect(() => {
    const voteFound = allVotes?.find(
      (vote) =>
        vote?.submission_id === submission?.id &&
        currentUser?.id === vote?.user_id,
    );
    voteFound ? setVoted(true) : setVoted(false);
  }, [allVotes, currentUser?.id, submission?.id]);

  const handleVote = async () => {
    if (!voteDisabled) {
      setVoted(true);
      const newVote = await postVote({
        user_id: currentUser?.id,
        submission_id: submission?.id,
      });
      setAllVotes((prevState) => [...prevState, newVote]);
    }
  };

  const handleUnvote = async () => {
    if (!voteDisabled) {
      setVoted(false);
      const voteToDelete = allVotes?.find(
        (vote) =>
          vote?.submission_id === submission?.id &&
          currentUser?.id === vote?.user_id,
      );
      await destroyVote(voteToDelete.id);
      setAllVotes((prevState) =>
        prevState.filter((vote) => vote.id !== voteToDelete?.id),
      );
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin: '1rem',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const classes = useStyles();

  // keep the first character of the last name, and add a dot. Do not keep the other letters of the last name.
  // if we have a last name (guard operator), continue with the line that gets only the first initial of the last name followed by a dot.
  let usersName = submission?.user?.first_name?.concat(
    ' ',
    submission?.user.last_name &&
      submission?.user?.last_name?.charAt(0).concat('.'),
  );

  return (
    <Card className={classes.root}>
      <CardHeader title={`${submission?.name}, by: ${usersName}`} />
      {submission?.file && (
        <CardMedia
          className={classes.media}
          image={submission?.file}
          title={submission.name}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {submission?.content}
        </Typography>
        <p>
          {allVotes.length === 1 ? (
            <>{allVotes?.length} vote</>
          ) : allVotes?.length === 0 ? (
            <>no votes</>
          ) : (
            <>{allVotes?.length} votes</>
          )}
        </p>
        {currentUser &&
          (!voted ? (
            <Button
              style={{
                display: submission?.user_id === currentUser?.id && 'none',
              }}
              disabled={voteDisabled}
              onClick={handleVote}
            >
              Vote For Me
            </Button>
          ) : (
            <>
              <Button onClick={handleUnvote}>Unvote</Button>{' '}
            </>
          ))}
        {submission?.user_id === currentUser?.id && (
          <Button
            variant="contained"
            disabled={submission?.user_id === currentUser?.id}
            color="secondary"
          >
            Can't vote for own entry
          </Button>
        )}
        {!currentUser && (
          <Button variant="contained" disabled={!currentUser} color="secondary">
            Please log in
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default SubmissionCard;
