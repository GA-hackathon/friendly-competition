import { useState } from "react";
import styled from "styled-components";
import QueriedContests from "../../components/ContestComponents/QueriedContests/QueriedContests";
import Search from "../../components/Form/Search";
import { useStateValue } from "../../providers/CurrentUserProvider";
import { useLocation } from 'react-router-dom'

let Div = styled.div`
  list-style-type: none;
  background: #e5e5e5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 5rem;

  .user-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    margin-left: 50px;
 }

  .search-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    margin-right: 50px;
  }
`;

function ExtendedNavBar({ allContests, allSubmissions }) {
  const [search, setSearch] = useState("");
  const [{ currentUser }, dispatch] = useStateValue()

  let location = useLocation()

  const getContests = () =>
    allContests.filter((contest) =>
      contest.name.toLowerCase().includes(`${search}`.toLowerCase())
    );

  const searchedContests = getContests().map((contest) => (
    <QueriedContests contest={contest} key={contest.id} />
  ));

  return (
    <Div>
      <div className="user-container">
        {currentUser && location.pathname === "/" && <> Welcome {currentUser?.first_name}</>}
      </div>
      <div className="search-container">
        <Search
          search={search}
          setSearch={setSearch}
          searchedContests={searchedContests}
        />
      </div>
    </Div >
  );
}

export default ExtendedNavBar;
