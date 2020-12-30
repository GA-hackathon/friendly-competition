import React, { useState, useEffect } from "react";
import Search from "../../../components/Form/Search";
import { useStateValue } from "../../../providers/CurrentUserProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useParams } from "react-router-dom";
import { getOneContest, getOneContestWithUser } from "../../../services/contests";
import FunOrangeLoading from "../../../components/Loading/FunOrangeLoading/FunOrangeLoading";
import "./ContestPage.css";
import Button from "@material-ui/core/Button";
import Layout from "../../../layout/Layout";
import TextField from "@material-ui/core/TextField";
import AddCircle from "@material-ui/icons/AddCircle";
import CountdownTimer from "../../../components/ContestComponents/CountdownTimer/CountdownTimer";
import ContestChat from "../../../components/ContestComponents/ContestChat/ContestChat";
import "./ContestPage.css";
import SubmissionCreate from "../../../components/Form/SubmissionCreate/SubmissionCreate";
import { getAllSubmissions } from "../../../services/submissions";
import SubmissionCard from "../../../components/SubmissionComponents/SubmissionCard";
import { toTitleCase } from "../../../utils/toTitleCase";

function ContestPage() {
  const [{ currentUser }] = useStateValue();
  const [contest, setContest] = useState(null);
  const [contestUser, setContestUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [allSubmissions, setAllSubmissions] = useState([])
  const { id } = useParams();


  useEffect(() => {
    const fetchSubmissions = async () => {
      const submissionData = await getAllSubmissions();
      setAllSubmissions(submissionData.filter((submission) => submission?.contest_id === contest?.id));
    };
    fetchSubmissions();
  }, [contest?.id]);

  console.log(allSubmissions)

  const ENTRIES = allSubmissions.map((submission) => {
    <React.Fragment key={submission.id}>
      <SubmissionCard submission={submission} contest={contest} currentUser={currentUser} />
    </React.Fragment>
  })

  // const SUBMISSIONS = allContests.submissions.map((submission) => {
  //   <React.Fragment key={submission.id}>
  //     <SubmissionCard submission={submission} />
  //   </React.Fragment>
  // })

  useEffect(() => {
    const contestDataForUser = async () => {
      const getContestUser = await getOneContestWithUser(id);
      setContestUser(getContestUser);
    };
    contestDataForUser();
  }, []);

  useEffect(() => {
    const contestData = async () => {
      const getContest = await getOneContest(id);
      setContest(getContest);
      setLoaded(true);
    };
    contestData();
  }, []);


  if (!loaded) {
    return <FunOrangeLoading />;
  }

  // get full first name, but only the first initial of the last name followed by a dot.
  let usersName = contestUser?.user?.first_name?.concat(
    " ",
    contestUser?.user?.last_name?.charAt(0).concat(".")
  );
  return (
    <Layout>
      <header>
        <div className="submission-name">{contest.name}</div>
      </header>
      <main>
        <section className="timer-container">
          <h5>Contest Ends In:</h5>
          <CountdownTimer />
          <h5>Contest Rules</h5>
          <div>{contest?.rules}</div>
          <h5>Try</h5>
          <span></span>
          <p>Join the Discussion</p>
        </section>

        <div className="create-submission">
          Contest Created by: {!contestUser?.user?.image ? <AccountCircleIcon className="icon-submission" /> : <img src={contest?.user?.image} alt={contest?.user?.name} />}
          <p>{toTitleCase(usersName)}</p>
          <section>
            <h5>Ready to Enter?</h5>
            <SubmissionCreate setAllSubmissions={setAllSubmissions} contest={contest} currentUser={currentUser} />
          </section>
        </div>
        <hr style={{ margin: "0rem 2rem" }} />
        <ContestChat />
        <section>
          <div className="submission-name">View Contest Entries</div>
          <div>{ENTRIES}</div>
        </section>
      </main>
    </Layout>
  );
}

export default ContestPage;
