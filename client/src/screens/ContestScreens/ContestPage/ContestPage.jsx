import React, { useState, useEffect, useRef } from 'react';
import { useStateValue } from '../../../providers/CurrentUserProvider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useParams } from 'react-router-dom';
import { getOneContest } from '../../../services/contests';
import FunOrangeLoading from '../../../components/Loading/FunOrangeLoading/FunOrangeLoading';
import './ContestPage.css';
import Layout from '../../../layout/Layout';
import CountdownTimer from '../../../components/ContestComponents/CountdownTimer/CountdownTimer';
import ContestChat from '../../../components/ContestComponents/ContestChat/ContestChat';
import './ContestPage.css';
import SubmissionCreate from '../../../components/Form/SubmissionCreate/SubmissionCreate';
import { getAllVotes } from '../../../services/votes';
import SubmissionCard from '../../../components/SubmissionComponents/SubmissionCard';
import { toTitleCase } from '../../../utils/toTitleCase';
import { Link } from 'react-router-dom';

function ContestPage() {
  const [{ currentUser }] = useStateValue();
  const [contest, setContest] = useState(null);
  const [isContestLoaded, setIsContestLoaded] = useState(false);
  const [activeSubmissions, setActiveSubmissions] = useState([]);
  const [contestEnded, setContestEnded] = useState(false);
  const [winnerSubmission, setWinnerSubmission] = useState(null);
  const [reload, setReload] = useState();
  let canSubmitEntry = useRef(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const fetchedContest = await getOneContest(id);

      setActiveSubmissions(fetchedContest.submissions);
      const entryExists = fetchedContest?.submissions?.find(
        (sub) => sub.user.id === currentUser?.id,
      );
      canSubmitEntry.current = entryExists ? false : true;
      setContest(fetchedContest);
      setIsContestLoaded(true);
    };
    fetchSubmissions();
  }, [id, reload, currentUser?.id]);

  const compareDates = (contest, property) => {
    let currentTime = new Date().getTime();
    let time2 = new Date(contest[property]).getTime();

    if (currentTime < time2) {
      return -1;
    } else if (currentTime > time2) {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (contest?.id) {
      let contestEnded = compareDates(contest, 'ending_time') > 0;
      if (contestEnded) {
        const fetchVotes = async () => {
          // all the votes in the app
          const voteData = await getAllVotes();
          let submissionVotes = new Map();
          // filter votes which are only in this contest

          //activeSubmissions.map(ac => ac.id).includes(v.submission_id)
          // create an array of submission ids
          //check if vote.submissionid is included in array of submission ids
          // so we get all the vots for the contest
          // loop through them and create the map of submission id and  its vote count

          // this if condition is to avoid an error "Reduce of empty array with no initial value"
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
          // We want to loop through the voteData and create an object with the keys as the submission id and the vote count as the number of votes

          /*eslint-disable */
          //disabling eslint for line 87 warning
          voteData
            .filter((v) =>
              activeSubmissions.map((ac) => ac.id).includes(v?.submission_id),
            )
            .map((vote) => {
              if (submissionVotes.has(vote?.submission_id)) {
                let existingCount = submissionVotes.get(vote.submission_id);
                submissionVotes.set(vote.submission_id, existingCount + 1);
              } else {
                submissionVotes.set(vote.submission_id, 1);
              }
            });
          // re-enabling es-lint
          /*eslint-enable */
          // find the highest voted submission
          // This handles the edge case where there are entries but there are no votes for the entires
          if (submissionVotes.size === 0) {
            // just pick the first submission
            setWinnerSubmission(activeSubmissions[0]);
            return;
          }
          let highestVoted = [...submissionVotes.entries()]?.reduce(
            // we are sorting it based on the valuew hich is the highest.
            (previousVote, currentVote) =>
              currentVote[1] > previousVote[1] ? currentVote : previousVote,
            //submissionid is null, no votes.
            [null, 0],
          );
          //highestvoted[0] = submissionid
          // highestVoted[1] = vote count for that submission
          const winner = activeSubmissions.find(
            (sub) => sub.id === highestVoted[0],
          );
          setWinnerSubmission({ ...winner, votes: highestVoted[1] });
        };
        fetchVotes();
      }
      setContestEnded(contestEnded);
    }
  }, [contest?.id, activeSubmissions, contest]);

  // get full first name, but only the first initial of the last name followed by a dot.
  let usersName = contest?.user?.first_name?.concat(
    ' ',
    // if the user has a last name, continue with the next line (guard operator), else, do not continue.
    contest?.user.last_name &&
      // keep the first character of the last name, and add a dot. Do not keep the other letters of the last name.
      contest?.user?.last_name?.charAt(0).concat('.'),
  );

  const onNewEntryCreated = (newEntry) => {
    setReload(newEntry.id);
  };

  if (!isContestLoaded) {
    return <FunOrangeLoading />;
  }

  return (
    <Layout>
      <section className="contest-info">
        <div className="timer-container">
          <h4 className="submission-name">{contest?.name}</h4>
          {!contestEnded ? (
            <h5>Contest Ends In:</h5>
          ) : (
            <>
              <h5>Contest Ended</h5>
            </>
          )}
          <CountdownTimer setContestEnded={setContestEnded} contest={contest} />
          <h5>Contest Rules</h5>
          <div>{contest?.rules}</div>
          <h5>Try</h5>
          <div className="contest-pic">
            {contest.picture && (
              <img src={contest?.picture} alt={contest?.name} />
            )}
          </div>
        </div>

        <div className="create-submission">
          Contest Created by:
          {!contest?.user?.image ? (
            <AccountCircleIcon className="icon-submission" />
          ) : (
            <Link to={`../users/${contest.user.id}`}>
              <img
                className="user-image"
                src={contest?.user?.image}
                alt={contest?.user?.name}
              />
            </Link>
          )}
          <p style={{ marginTop: '0' }}>{toTitleCase(usersName)}</p>
          {!contestEnded ? (
            <section className="submission-form">
              {canSubmitEntry.current && (
                <h5 style={{ textAlign: 'center' }}>Ready to Enter?</h5>
              )}
              <SubmissionCreate
                canSubmitEntry={canSubmitEntry.current}
                setAllSubmissions={setActiveSubmissions}
                contest={contest}
                onNewEntryCreated={onNewEntryCreated}
                currentUser={currentUser}
              />
            </section>
          ) : (
            <div>
              <div>
                WINNER: Entry: {winnerSubmission?.name} User:
                {winnerSubmission?.user.first_name}
                {winnerSubmission?.votes ? (
                  <>, votes: {winnerSubmission?.votes}</>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <h5 style={{ margin: '2rem 2rem' }}>Join the Discussion</h5>
      <hr style={{ margin: '0rem 2rem' }} />
      <ContestChat contest={contest} />
      <section>
        <div className="submission-name">View Contest Entries</div>
        <div className="contest-entries">
          {activeSubmissions.map((submission) => {
            return (
              <React.Fragment key={submission.id}>
                <SubmissionCard
                  submission={submission}
                  contest={contest}
                  currentUser={currentUser}
                />
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export default ContestPage;
