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

  const oldContestsJSX = oldestContests.map((contest) => (
    <ContestCard key={contest.id} contest={contest} />
  ));

  return (
    <Layout>
      <Wrapper>
        <div className="row-1">
          {currentUser && <>Welcome {currentUser?.first_name}</>}&nbsp;
          <Search search={search} setSearch={setSearch} />
        </div>
        {!loaded ? (
          <FunOrangeLoading />
        ) : (
          <div className="all-contests">
            <div className="contest-container oldest">{oldContestsJSX}</div>
            <div className="contests-container newest">
              <h1> NEW Contests</h1>
              <div className="contests">{newContestsJSX}</div>
            </div>
          </div>
        )}
      </Wrapper>
    </Layout>
  );
}

export default Home;
