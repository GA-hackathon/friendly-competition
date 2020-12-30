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
  getNewestContests,
  getOldestContests,
} from "../../../services/contests";
import ContestCard from "../../../components/ContestComponents/ContestCard/ContestCard";

function Home() {
  const [{ currentUser }] = useStateValue();
  const [search, setSearch] = useState("");
  const [allContests, setAllContests] = useState([]);
  const [newestContests, setNewestContests] = useState([]);
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
    const fetchNewestContests = async () => {
      const newContestData = await getNewestContests();
      setNewestContests(newContestData);
      setLoaded(true);
    };
    fetchNewestContests();
  }, []);

  useEffect(() => {
    const fetchOldestContests = async () => {
      const oldContestData = await getOldestContests();
      setOldestContests(oldContestData);
      setLoaded(true);
    };
    fetchOldestContests();
  }, []);

  const newContestsJSX = newestContests.map((contest) => <ContestCard />);
  return (
    <Layout>
      <Wrapper>
        <div className="row-1">
          {currentUser && <>Welcome {currentUser?.first_name}</>}&nbsp;
          <Search search={search} setSearch={setSearch} />
        </div>
      </Wrapper>
    </Layout>
  );
}

export default Home;
