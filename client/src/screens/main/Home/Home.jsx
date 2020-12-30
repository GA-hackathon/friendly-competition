import { Link, Switch, Route } from "react-router-dom";
import { useStateValue } from "../../../providers/CurrentUserProvider";
import { useState, useEffect } from "react";
import Search from "../../../components/Form/Search";
import Wrapper from "./styledHome";
import Layout from "../../../layout/Layout";
import {
  destroyContest,
  getAllContests,
  postContest,
  putContest,
  getOneContest,
} from "../../../services/contests";
import ContestCard from "../../../components/ContestComponents/ContestCard/ContestCard";
import FunOrangeLoading from "../../../components/Loading/FunOrangeLoading/FunOrangeLoading";
import ScrollToTopOnMount from "../../../components/Helpers/ScrollToTopOnMount";
import ContestPage from "../../ContestScreens/ContestPage/ContestPage";

function Home() {
  const [{ currentUser }] = useStateValue();
  const [allContests, setAllContests] = useState([]);

  const [loaded, setLoaded] = useState(false);

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
    const fetchContests = async () => {
      const contestData = await getAllContests();
      setAllContests(
        contestData
          .filter(
            (contest) =>
              compareDates(
                { ending_time: new Date().toISOString() },
                contest,
                "ending_time"
              ) < 1
          )
          // only show 6 contests
          .slice(0, 6)
      );

      setLoaded(true);
    };
    fetchContests();
  }, []);

  //only get the newest 6 contests,
  // if the ending time has passed, don't show them.
  const newContestsJSX = allContests.map((contest) => (
    <ContestCard allContests={allContests} key={contest.id} contest={contest} />
  ));

  // only get the 6 ending soon
  const oldContestsJSX = allContests
    // it's sorting in ascending order
    //  so the dates which are ending soon will be shown first
    .sort((contest1, contest2) =>
      compareDates(contest1, contest2, "ending_time")
    )
    .map((contest) => <ContestCard allContests={allContests} key={contest.id} contest={contest} />);

  return (
    <>
      <ScrollToTopOnMount />
      <Layout>
        <Wrapper>
          <div className="row-1">
          </div>
          {!loaded ? (
            <FunOrangeLoading />
          ) : (
              <div className="all-contests inner-column">
                <h1 className="attention6"> Contests Ending Soon</h1>
                <div className="contest-list oldest">{oldContestsJSX}</div>
                <h1 className="attention"> NEW Contests</h1>
                <div className="contest-list newest">{newContestsJSX}</div>
              </div>
            )}
        </Wrapper>
      </Layout>

    </>
  );
}

export default Home;
