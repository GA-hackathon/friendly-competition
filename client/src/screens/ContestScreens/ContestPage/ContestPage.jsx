import React, { useState, useEffect } from "react";
// import Search from "../../../components/Form/Search";
import { useStateValue } from "../../../providers/CurrentUserProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useParams } from "react-router-dom";
import { getOneContest, getOneContestWithUser } from "../../../services/contests";
import FunOrangeLoading from "../../../components/Loading/FunOrangeLoading/FunOrangeLoading";
import "./ContestPage.css";
// import Button from "@material-ui/core/Button";
import Layout from "../../../layout/Layout";
// import TextField from "@material-ui/core/TextField";
// import AddCircle from "@material-ui/icons/AddCircle";
import CountdownTimer from "../../../components/ContestComponents/CountdownTimer/CountdownTimer";
import ContestChat from "../../../components/ContestComponents/ContestChat/ContestChat";
import "./ContestPage.css";
import SubmissionCreate from "../../../components/Form/SubmissionCreate/SubmissionCreate";
import { getAllSubmissions } from "../../../services/submissions";
import { getAllVotes } from "../../../services/votes";
import SubmissionCard from "../../../components/SubmissionComponents/SubmissionCard";
import { toTitleCase } from "../../../utils/toTitleCase";

function ContestPage() {
  const [{ currentUser }] = useStateValue();
  const [contest, setContest] = useState(null);
  const [contestUser, setContestUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [activeSubmissions, setActiveSubmissions] = useState([])
  // const [allSubmissions, setAllSubmissions] = useState([])
  const [isSubmitted, setSubmitted] = useState(false)
  const [contestEnded, setContestEnded] = useState(false);
  const [winnerSubmission, setWinnerSubmission] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const fetchedContest = await getOneContest(id);
      const submissionData = await getAllSubmissions();
      setActiveSubmissions(submissionData.filter((submission) => submission?.contest_id === fetchedContest?.id));
      setContest(fetchedContest);
      setLoaded(true);
    };
    fetchSubmissions();
  }, []);

  const compareDates = (contest1, contest2, property) => {
    let time1 = new Date(contest1[property]).getTime();
    let time2 = new Date(contest2[property]).getTime();

    if (time1 < time2) {
      return -1;
    } else if (time1 > time2) {
      return 1;
    } else {
      return 0;
    }
  };
  useEffect(() => {
    if (contest?.id) {
      let contestEnded =
        compareDates({
          ending_time: new Date().toISOString()

        }, contest, "ending_time") > 0;
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
          // We want to loop through the votData and create an object with the keys as the submission id and the vote count as the number of votes
          // 

          voteData.filter(v => activeSubmissions.map(ac => ac.id).includes(v?.submission_id)).map(vote => {
            if (submissionVotes.has(vote?.submission_id)) {
              let existingCount = submissionVotes.get(vote.submission_id);
              submissionVotes.set(vote.submission_id, existingCount + 1);
            } else {
              submissionVotes.set(vote.submission_id, 1);
            }
          });
          // find the highest voted submission
          // This handles the edge case where there are entries but there are no votes for the entires
          if (submissionVotes.size === 0) {
            // just pick the first submission
            setWinnerSubmission(activeSubmissions[0])
            return
          }
          let highestVoted = [...submissionVotes.entries()]?.reduce((a, e) => e[1] > a[1] ? e : a, [null, 0]);
          //highestvoted[0] = submissionid
          // highestVoted[1] = vote count for that submission
          const winner = activeSubmissions.find(sub => sub.id === highestVoted[0]);
          setWinnerSubmission(
            { ...winner, votes: highestVoted[1] });

        };
        fetchVotes();
      }
      setContestEnded(contestEnded);
    }
  }, [contest?.id])

  useEffect(() => {
    const contestDataForUser = async () => {
      const getContestUser = await getOneContestWithUser(id);
      setContestUser(getContestUser);
    };
    contestDataForUser();
  }, []);




  // get full first name, but only the first initial of the last name followed by a dot.
  let usersName = contestUser?.user?.first_name?.concat(
    " ",
    contestUser?.user?.last_name?.charAt(0).concat(".")
  );

  // if a submission/entry is associated to the current user, do not allow him to resend another one.
  useEffect(() => {
    const entryFound = activeSubmissions?.find(
      (submission) =>
        submission?.contest_id === contest?.id && currentUser?.id === submission?.user_id
    );
    entryFound ? setSubmitted(true) : setSubmitted(false);
  }, [activeSubmissions, currentUser?.id, contest?.id]);

  if (!loaded) {
    return <FunOrangeLoading />;
  }


  return (
    <Layout>
      <section className='contest-info'>
        <div className="timer-container">
        <h4 className="submission-name">{contest?.name}</h4>
        {!contestEnded ?
              <h5>Contest Ends In:</h5> : <><h5>Contest Ended</h5></>}
          <CountdownTimer contest={contest} />
          <h5>Contest Rules</h5>
          <div>{contest?.rules}</div>
          <h5>Try</h5>
          <div className='contest-pic'>{contest.picture && <img src={contest?.picture} />}</div>
        </div>

        <div className="create-submission">
          Contest Created by: {!contestUser?.user?.image ? <AccountCircleIcon className="icon-submission" /> : <img className="user-image" src={contestUser?.user?.image} alt={contestUser?.user?.name} />}
          <p style={{ marginTop: '0'}}>{toTitleCase(usersName)}</p>
          {!contestEnded ? <section className='submission-form'>
            <h5 style={{ textAlign: 'center'}}>Ready to Enter?</h5>
            <SubmissionCreate isSubmited={isSubmitted} setAllSubmissions={setActiveSubmissions} contest={contest} currentUser={currentUser} />
          </section> : <div>

              <div>WINNER: Entry: {winnerSubmission?.name}  User: {winnerSubmission?.user.first_name} {winnerSubmission?.votes ? <>, votes: {winnerSubmission?.votes}</> : <></>}</div>
            </div>}
        </div>
      </section>
      <h5 style={{ margin: "2rem 2rem"}}>Join the Discussion</h5>
      <hr style={{ margin: "0rem 2rem" }} />
        <ContestChat />
        <section>
          <div className="submission-name">View Contest Entries</div>
          <div className='contest-entries'>{activeSubmissions.map((submission) => {
            return <React.Fragment key={submission.id}>
              <SubmissionCard submission={submission} contest={contest} currentUser={currentUser} />
            </React.Fragment>
          })}</div>
        </section>
    </Layout>
  );
}

export default ContestPage;
