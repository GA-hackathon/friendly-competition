import React, { useState, useEffect } from "react";
import Search from "../../../components/Form/Search";
import { useStateValue } from "../../../providers/CurrentUserProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useParams } from "react-router-dom";
import { getOneContest } from "../../../services/contests";
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

function ContestPage() {
  const [{ currentUser }] = useStateValue();
  const [contest, setContest] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [allSubmissions, setAllSubmissions] = useState([])
  const { id } = useParams();


useEffect(() => {
    const fetchSubmissions = async () => {
      const submissionData = await getAllSubmissions();
      setAllSubmissions(submissionData?.filter((submission) => submission?.contest_id === contest?.id));
    };
    fetchSubmissions();
  }, [contest?.id]);


  useEffect(() => {
    const getData = async () => {
      const getContest = await getOneContest(id);
      setContest(getContest);
      setLoaded(true);
    };
    getData();
  }, [id]);

  if (!loaded) {
    return <FunOrangeLoading />;
  }
  let usersName = contest.user?.first_name?.concat(
    " ",
    contest?.user?.last_name.charAt(0)
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
          Contest Created by: <AccountCircleIcon className="icon-submission" />
          <span>{usersName}</span>
          <section>
            <h5>Ready to Enter?</h5>
            {/* <form className="submissions-form"> */}
            {/* <label>Entry Name<br/>
                <TextField variant='filled' type='text' name='submission_name'/>
                </label>
                <label>Write Entry<br/>
                <TextField multiline rows={4} variant='filled' type='textarea'name='content'/>
                </label>
                <label>Upload Entry
                <input
                type="file"
                id="image-upload"
                style={{ visibility: "hidden", fontSize: "0" }}
                // onChange={onImageSelected}
                />
                <div className='add-circle-icon'>
                <AddCircle style={{ fontSize: 30 }}></AddCircle>
                </div>
                </label>
                <Button className='enter-contest-btn' type='submit' variant="contained">Enter Contest</Button>
                </form>  */}
            <SubmissionCreate contest={contest} currentUser={currentUser} />
          </section>
        </div>
        <hr style={{ margin: "0rem 2rem" }} />
        <ContestChat />
        <section>
          <div className="submission-name">View Contest Entries</div>
        </section>
      </main>
    </Layout>
  );
}

export default ContestPage;
