import { Link } from "react-router-dom";
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
  getOldestContests,
} from "../../../services/contests";
import ContestCard from "../../../components/ContestComponents/ContestCard/ContestCard";
import FunOrangeLoading from "../../../components/Loading/FunOrangeLoading/FunOrangeLoading";
import ScrollToTopOnMount from "../../../components/Helpers/ScrollToTopOnMount";

function Home() {
  const [{ currentUser }] = useStateValue();
  const [search, setSearch] = useState("");
  const [allContests, setAllContests] = useState([]);
  const [oldestContests, setOldestContests] = useState([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchContests = async () => {
      const contestData = await getAllContests();
      setAllContests(contestData);
      setLoaded(true);
    };
    fetchContests();
  }, []);

  // using rails api to get the oldest 6, but to be honest, you can just use the slice method...
  useEffect(() => {
    const fetchOldestContests = async () => {
      const oldContestData = await getOldestContests();
      setOldestContests(oldContestData);
    };
    fetchOldestContests();
  }, []);

  //  only get the newest 6 contests
  const newContestsJSX = allContests
    .slice(0, 6)
    .map((contest) => <ContestCard key={contest.id} contest={contest} />);

  // only get the 6 ending soon
  const oldContestsJSX = oldestContests.map((contest) => (
    <ContestCard key={contest.id} contest={contest} />
  ));

  // const oldContestsJSX = allContests
  //   .slice(1)
  //   .slice(-6)
  //   .map((contest) => <ContestCard key={contest.id} contest={contest} />);

  //   var array = [1, 55, 77, 88, 76, 59];
  // var array_last_five;
  // array_last_five = array.slice(-5);
  // if (array.length < 6) {
  //      array_last_five.shift();
  // }

  return (
    <Layout>
      <ScrollToTopOnMount />
      <Wrapper>
        <div className="row-1">
          {currentUser && <>Welcome {currentUser?.first_name}</>}&nbsp;
          {/* <Search search={search} setSearch={setSearch} /> */}
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
  );
}

export default Home;
